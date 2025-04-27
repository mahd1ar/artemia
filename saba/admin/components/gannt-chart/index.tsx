import type { ExcludesFalse } from '../../../data/utils'
import { useQuery } from '@apollo/client'
import { gql } from '@ts-gql/tag/no-transform'
import Gantt from 'frappe-gantt'
import React, { useEffect, useRef } from 'react'
import './main.css'

export function GanttChart() {
  const gantt = useRef<Gantt | null>(null)

  const CHARTDATA = gql`
    query CHARTDATA {
  
      contracts {
        id
        end
        startFrom
        summery
        physicalProgress
      }

}
    ` as import('../../../__generated__/ts-gql/CHARTDATA').type

  const data = useQuery(CHARTDATA)

  useEffect(() => {
    const tasks: Gantt.Task[] = data.data?.contracts?.map((contract) => {
      if (!contract.startFrom || !contract.end)
        return null

      return {
        id: contract.id,
        name: contract.summery!,
        start: new Date(contract.startFrom * 1000).toISOString().split('T')[0], // contract.startFrom,
        end: new Date(contract.end * 1000).toISOString().split('T')[0], // contract.end,
        progress: contract.physicalProgress,
        dependencies: [],
      }
    }).filter(Boolean as unknown as ExcludesFalse) || []

    if (document.querySelector('#gantt')) {
      gantt.current = new Gantt('#gantt', tasks, {
        view_mode: 'Month',
        readonly: true,
        scroll_to: new Date(new Date().getTime() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        container_height: 500,
      })
    }
  }, [data.data?.contracts])

  useEffect(() => {
    return () => {
      if (gantt.current) {
        gantt.current.clear()
        gantt.current = null
      }
    }
  }, [])

  if (data.loading)
    return <span>loading</span>
  if (!data.data?.contracts)
    return <div>Error</div>

  return (
    <>
      <div style={{ width: '100%' }}>

        <div id="gantt"></div>
      </div>
    </>
  )
}
