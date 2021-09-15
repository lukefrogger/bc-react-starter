import React from 'react'

import { Button as ReakitButton } from 'reakit/Button'
import {
  Dialog as ReakitDialog,
  DialogBackdrop,
  DialogStateReturn,
} from 'reakit/Dialog'
import { Typography } from 'unsafe-bc-react-components'

import * as styles from './styles'

export type DialogProps = DialogStateReturn & {
  title?: string
  children?: React.ReactNode
  className?: string
  onClickClose?: React.MouseEventHandler<HTMLButtonElement>
  onClickBack?: React.MouseEventHandler<HTMLButtonElement>
}

export function Dialog(props: DialogProps): React.ReactElement {
  const { title, children, className, onClickClose, onClickBack, ...dialog } =
    props

  return (
    <DialogBackdrop {...dialog} css={styles.backdrop}>
      <ReakitDialog
        {...dialog}
        // TODO: Add a aria-label
        className={className}
        css={styles.dialog}
      >
        {onClickBack && (
          <ReakitButton css={styles.back} onClick={onClickBack}>
            <svg
              width={14}
              height={22}
              viewBox="0 0 14 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.875 1L1.625 11l11.25 10"
                stroke="#8E8E8E"
                strokeWidth={2}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ReakitButton>
        )}
        {title && (
          <div css={styles.header}>
            <Typography variant="display" css={styles.title}>
              {title}
            </Typography>
          </div>
        )}
        <ReakitButton css={styles.close} onClick={onClickClose || dialog.hide}>
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
