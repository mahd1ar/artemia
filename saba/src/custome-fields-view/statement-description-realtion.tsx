import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps } from '@keystone-6/core/types'
import { useLazyQuery, useQuery } from '@apollo/client'
import { Stack } from '@keystone-ui/core'
import { FieldContainer, FieldLabel, Select } from '@keystone-ui/fields'
import { useToasts } from '@keystone-ui/toast'
import { gql } from '@ts-gql/tag/no-transform'
import React, { useEffect, useMemo, useState } from 'react'

// import { useRouter } from "@keystone-6/core/dist/declarations/src/admin-ui/router";
import { useRouter } from 'next/router'

interface Option {
  value: string
  label: string
}

export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  if (value.kind !== 'one') {
    return (
      <div>
        <p>value.kind is not one</p>
      </div>
    )
  }

  const firstOption: Option = {
    value: '',
    label: 'انتخاب کنید',
  }

  const toast = useToasts()

  const router = useRouter()
  const [isHidden] = useState(router.pathname.split('/').filter(Boolean).at(0) === 'descriptions')

  const [selectedProject, setSelectedProject] = useState<Option>(firstOption)
  const [selectedApproval, setSelectedApproval] = useState<Option>(firstOption)
  const [selectedDescriptoins, setSelectedDescriptoins] = useState<Option>(firstOption)

  const PROJECTS_Q = gql`
    query PROJECTS_Q {
      projects {
        id
        title
        onGoing {
          id
          title
        }
        outside {
          id
          title
        }
      }
    }
  ` as import('../../__generated__/ts-gql/PROJECTS_Q').type

  const APPROVALS_OF_PROJECT_Q = gql`
        query APPROVALS_OF_PROJECT_Q($projectId: ID!) {
          approvals (where:  { project:  { id:  { equals: $projectId } } }) {
            id
            code
            title
          }
        }` as import('../../__generated__/ts-gql/APPROVALS_OF_PROJECT_Q').type

  const DESCRIPTION_OF_APPROVAL_Q = gql`
query DESCRIPTION_OF_APPROVAL_Q($approvalId: ID!) {
  descriptions (where:  {
     approvals:  {
        id:  {
           equals: $approvalId
        }
     }
  }) {
    id
    code
    title
  }
      }` as import('../../__generated__/ts-gql/DESCRIPTION_OF_APPROVAL_Q').type

  const CORESPONDIG_TREE = gql`
query CORESPONDIG_TREE($descriptionId: ID!) {
  description(where: {id: $descriptionId}) {
    id
    title
    fromOutsideProject {
      id
      title
    }
    fromOnGoingProject {
      id
      title
    }
    approvals {
      id
      code
      title
      project {
        id
        title
        onGoing {
          id
          title
        }
        outside {
          id
          title
        }
      }
    }
  }
}
` as import('../../__generated__/ts-gql/CORESPONDIG_TREE').type

  const { data: projectsOptions } = useQuery(PROJECTS_Q)
  const [loadApproval, { data: approvalsOptions }] = useLazyQuery(APPROVALS_OF_PROJECT_Q)
  const [loadDescription, { data: descriptionOptions }] = useLazyQuery(DESCRIPTION_OF_APPROVAL_Q)

  const [loadCoresponsiveTree] = useLazyQuery(CORESPONDIG_TREE)

  useEffect(() => {
    if (value && value.initialValue) {
      loadCoresponsiveTree({ variables: { descriptionId: value.initialValue.id } })
        .then((res) => {
          if (!res.data?.description) {
            return toast.addToast({
              title: 'ERROR - no coresponsive tree',
              tone: 'negative',
            })
          }

          const descriptionId = res.data.description.id
          const descriptionTitle = res.data.description.title || '-'

          const approvalId = res.data.description.approvals?.id || '!-'
          const approvalTitle = res.data.description.approvals?.title || '-'

          const projectId = res.data.description.approvals?.project?.id
            || res.data.description.fromOnGoingProject?.id
            || res.data.description.fromOutsideProject?.id || '!-'
          const projectTitle = res.data.description.approvals?.project?.title
            || res.data.description.fromOnGoingProject?.title
            || res.data.description.fromOutsideProject?.title || '-'

          setSelectedDescriptoins({
            label: descriptionTitle,
            value: descriptionId,
          })

          setSelectedApproval({
            label: approvalTitle,
            value: approvalId,
          })

          setSelectedProject({
            label: projectTitle,
            value: projectId,
          })
        })
    }
  }, [])

  useEffect(() => {
    (async () => {
      if (selectedProject && selectedProject.value) {
        await loadApproval({ variables: { projectId: selectedProject.value } })
        // await loadDescription({ variables: { approvalId: 'mock' } })
      }
    })()
  }, [selectedProject])

  useEffect(() => {
    (async () => {
      if (selectedApproval && selectedApproval.value) {
        await loadDescription({ variables: { approvalId: selectedApproval.value } })
      }
    })()
  }, [selectedApproval])

  const memoDescriptionOptions = useMemo(() => {
    const options: Option[] = []

    if (approvalsOptions?.approvals?.length) {
      if (descriptionOptions?.descriptions?.length) {
        descriptionOptions.descriptions.forEach((i) => {
          options.push({
            label: i.title || '-',
            value: i.id,
          })
        },
        )
      }
    }

    const project = projectsOptions?.projects?.find(i => i.id === selectedProject.value)

    if (project?.onGoing) {
      options.push({
        label: project.onGoing.title || '-',
        value: project.onGoing.id,
      })
    }

    if (project?.outside) {
      options.push({
        label: project.outside.title || '-',
        value: project.outside.id,
      })
    }

    return options
  }, [projectsOptions, selectedProject, descriptionOptions, approvalsOptions])

  async function onChangeApproval(option: Option) {
    setSelectedApproval(option)
  }

  async function onChangeProject(option: Option) {
    setSelectedProject(option)
    // const res = await loadApproval({ variables: { id: option.value } })
  }

  async function onChangeDescription(option: Option) {
    setSelectedDescriptoins(option)
    onChange?.({
      value: {
        id: option.value,
        label: option.label,
      },
      kind: 'one',
      id: value.id,

      initialValue: value.initialValue,
    })
  }

  return (
    <>
      {!isHidden

      && (
        <FieldContainer>
          <FieldLabel>{field.label}</FieldLabel>
          <Stack gap="large">
            <Select
              onChange={onChangeProject}
              value={selectedProject}
              options={projectsOptions?.projects?.map(i => ({ label: i.title || '-', value: i.id })) || []}
              isDisabled={!onChange}
            />

            {approvalsOptions?.approvals?.length && (
              <Select
                isDisabled={!onChange}
                onChange={onChangeApproval}
                value={selectedApproval}
                options={approvalsOptions.approvals?.map(i => ({ label: i.title || '-', value: i.id })) || []}
              />
            )}

            {memoDescriptionOptions.length && (
              <Select
                isDisabled={!onChange}
                onChange={onChangeDescription}
                value={memoDescriptionOptions.find(i => i.value === selectedDescriptoins.value) ? selectedDescriptoins : { label: 'انتخاب کنید', value: '' }}
                options={memoDescriptionOptions}
              />
            )}
          </Stack>

          <bdi style={{
            display: 'none',
            gap: '2px',
            alignItems: 'center',
            minHeight: '38px',
            outline: '0 !important',
            position: 'relative',
            backgroundColor: '#fafbfc',
            borderColor: '#e1e5e9',
            borderRadius: '6px',
            borderStyle: 'solid',
            borderWidth: '1px',
            boxSizing: 'border-box',
            fontSize: '1rem',
          }}
          >
            <span style={{ display: 'inline-block' }}>
              {selectedProject.label}
            </span>
            <span style={{ display: 'inline-block' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="m5.293 8l3.854 3.854l.707-.707L6.707 8l3.147-3.146l-.707-.708z" clipRule="evenodd" /></svg>
            </span>
            <span style={{ display: 'inline-block' }}>
              {selectedApproval.label}
            </span>
            <span style={{ display: 'inline-block' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="m5.293 8l3.854 3.854l.707-.707L6.707 8l3.147-3.146l-.707-.708z" clipRule="evenodd" /></svg>
            </span>
            <span style={{ display: 'inline-block' }}>
              {memoDescriptionOptions.find(i => i.value === selectedDescriptoins.value)?.label}
            </span>
          </bdi>
        </FieldContainer>
      )}

    </>
  )
}
