import * as React from 'react'

import type { UseProductOptions } from '@hooks'
import {
  Button,
  DatePicker,
  Field,
  Typography,
} from 'unsafe-bc-react-components'

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

  if (option.__typename === 'MultipleChoiceOption')
    return (
      <div key={option.displayName}>
        <Typography variant="display-xx-small">
          {option.displayName.toUpperCase()}
        </Typography>
        <div css={styles.selectors}>
          {option.values?.edges?.map((value) => {
            if (!value) return null
            const { entityId, label } = value.node
            const active = choices[option.entityId]
            return (
              <Button
                variant="selector"
                key={entityId}
                data-selected={active === entityId}
                onClick={() => {
                  setChoices({
                    ...choices,
                    [option.entityId]: entityId,
                  })
                }}
              >
                {label}
              </Button>
            )
          })}
        </div>
      </div>
    )
  if (option.__typename === 'DateFieldOption') {
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
  if (
    option.__typename === 'TextFieldOption' ||
    option.__typename === 'MultiLineTextFieldOption'
  ) {
    return (
      <Field
        {...(option.__typename === 'MultiLineTextFieldOption' && {
          as: 'textarea',
        })}
        value={String(choices[option.entityId])}
        name={option.displayName}
        label={option.displayName.toUpperCase()}
        onChange={(e) => {
          // TODO: Add support for target.value in components library
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type '{}'.
          const { value } = e.target
          setChoices({
            ...choices,
            [option.entityId]: value,
          })
        }}
      />
    )
  }

  return null
}
