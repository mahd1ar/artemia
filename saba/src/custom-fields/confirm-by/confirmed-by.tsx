import { useTheme } from '@keystone-ui/core'
import { Checkbox } from '@keystone-ui/fields'
import React from 'react'

type ConfirmedByProps = {
  value: boolean | null
  onChange?: (value: boolean | null) => void
}

export function ConfirmedBy(props: ConfirmedByProps) {

  const { spacing } = useTheme()

  return (
    <div>
      <div>
        {!!props.value ? 'Yes' : 'No'}
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
