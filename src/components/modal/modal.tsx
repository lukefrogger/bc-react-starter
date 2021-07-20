import * as React from 'react'

import { Dialog, DialogBackdrop } from 'reakit/Dialog'

import { Close } from '@components/header/icons'

import * as styles from './styles'

export function Modal({ children, ...modalProps }: any): React.ReactElement {
  return (
    <DialogBackdrop {...modalProps} css={styles.Backdrop}>
      <Dialog {...modalProps} css={styles.Modal}>
        <button
          onClick={modalProps.hide}
          css={styles.Close}
          type="button"
          aria-label="Close"
        >
          <Close />
        </button>
        {children}
      </Dialog>
    </DialogBackdrop>
  )
}
