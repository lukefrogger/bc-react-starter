import React from 'react'

import { Button as ReakitButton } from 'reakit/Button'
import {
  Dialog as ReakitDialog,
  DialogBackdrop,
  DialogStateReturn,
} from 'reakit/Dialog'
import { Typography } from 'unsafe-bc-react-components'

import * as styles from './styles'

type DialogProps = DialogStateReturn & {
  title?: string
  children?: React.ReactNode
  className?: string
}

export function Dialog(props: DialogProps): React.ReactElement {
  const { title, children, className, ...dialog } = props

  return (
    <DialogBackdrop {...dialog} css={styles.backdrop}>
      <ReakitDialog
        {...dialog}
        aria-label="Welcome"
        className={className}
        css={styles.dialog}
      >
        {title && (
          <div css={styles.header}>
            <Typography variant="display" css={styles.title}>
              {title}
            </Typography>
          </div>
        )}
        <ReakitButton css={styles.close} onClick={dialog.hide}>
          <svg width={26} height={26} viewBox="0 0 26 26" fill="none">
            <path
              d="M24 2L2 24M24 24L2 2"
              stroke="currentColor"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
          </svg>
        </ReakitButton>
        {children}
      </ReakitDialog>
    </DialogBackdrop>
  )
}
