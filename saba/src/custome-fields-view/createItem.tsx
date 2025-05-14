import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps } from '@keystone-6/core/types'
import { ButtonGroup } from '@keystar/ui/button'
import { Dialog } from '@keystar/ui/dialog'
import { Content } from '@keystar/ui/slots'
import { Heading } from '@keystar/ui/typography'
import { useKeystone, useList } from '@keystone-6/core/admin-ui/context'
import { Fields } from '@keystone-6/core/admin-ui/utils'
import { Button } from '@keystone-ui/button'
import { Box } from '@keystone-ui/core'
import React from 'react'
import { useCreateItem } from './useCreateItem'

export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  if (typeof value === 'symbol')
    return null

  const { createViewFieldModes } = useKeystone()
  const list = useList(field.refListKey)
  const createItemState = useCreateItem(list)

  return (
    <Dialog>
      <Heading>
        Add
        {list.singular}
      </Heading>

      <Content>
        <form
          id={formId}
          onSubmit={async (e) => {
            if (e.target !== e.currentTarget)
              return
            e.preventDefault()
            const subItem = await builder.build()
            if (!subItem)
              return

            onChange(subItem)
            dialogState.dismiss()
          }}
        >
          <Box paddingY="xlarge">
            <Fields {...builder.props} />
          </Box>
        </form>
      </Content>

      <ButtonGroup>
        <Button onPress={dialogState.dismiss}>Cancel</Button>
        <Button form={formId} prominence="high" type="submit">
          Add
        </Button>
      </ButtonGroup>
    </Dialog>
  )

  return null
}
