import * as React from 'react'

import type { UseProductOptions } from '@hooks'
import { Button, DatePicker, Typography } from 'unsafe-bc-react-components'

import * as styles from './styles'

type ProductionOptionProps = Pick<
  UseProductOptions,
  'choices' | 'setChoices'
> & {
  option: UseProductOptions['options'][number]
}

export function ProductOption(
  props: ProductionOptionProps
): React.ReactElement | null {
  const { option, choices, setChoices } = props

  if (option.type === 'multipleChoice')
    return (
      <div key={option.displayName}>
        <Typography variant="display-xx-small">
          {option.displayName.toUpperCase()}
        </Typography>
        <div css={styles.selectors}>
          {option.values.map((value) => {
            const active = choices[option.entityId]
            return (
              <Button
                variant="selector"
                key={value.entityId}
                data-selected={active === value.entityId}
                onClick={() => {
                  setChoices({
                    ...choices,
                    [option.entityId]: value.entityId,
                  })
                }}
              >
                {value.label}
              </Button>
            )
          })}
        </div>
      </div>
    )
  if (option.type === 'dateField') {
    return (
      <DatePicker
        // TODO: Get props from original component
        minDate={new Date(option.earliest)}
        {...(option.earliest && {
          minDate: new Date(option.earliest),
        })}
        {...(option.latest && {
          maxDate: new Date(option.latest),
        })}
        label={option.displayName.toUpperCase()}
        placeholderText="Placeholder text"
        selected={choices[option.entityId]}
        onChange={(date: Date) => {
          setChoices({
            ...choices,
            [option.entityId]: date,
          })
        }}
      />
    )
  }
  return null
}
