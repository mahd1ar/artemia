import { Checkbox } from '@keystone-ui/fields'
import React from 'react'

interface ConfirmedByProps {
  value: boolean | null
  onChange?: (_value: boolean | null) => void
}

export function ConfirmedBy(props: ConfirmedByProps) {
  return (
    <div>
      <div>
        {props.value ? 'Yes' : 'No'}
        {/* css={{ marginRight: spacing.medium }} */}
        <Checkbox
          checked={!!props.value}
          onChange={event => props.onChange?.(event.target.checked ? true : null)}
        >
          Check Me
        </Checkbox>

      </div>
    </div>
  )
}
