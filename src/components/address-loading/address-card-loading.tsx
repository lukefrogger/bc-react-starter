import * as React from 'react'

import { useTheme } from '@emotion/react'
import { CSSPrimitive } from 'unsafe-bc-react-components/dist/theme/types'

import * as styles from './styles'

export function AddressCardLoading(): React.ReactElement {
  const theme = useTheme()
  const sharedStyles = theme.components.AddressCard

  return (
    <div css={[sharedStyles.Container, styles.Container] as CSSPrimitive[]}>
      <h4 css={sharedStyles.Name}>
        <span css={styles.AddressName}>&nbsp;</span>
      </h4>
      <p css={sharedStyles.AddressLine}>
        <span
          css={[styles.AddressLines, styles.AddressLine1] as CSSPrimitive[]}
        >
          &nbsp;
        </span>
      </p>
      <p css={sharedStyles.AddressLine}>
        <span
          css={[styles.AddressLines, styles.AddressLine2] as CSSPrimitive[]}
        >
          &nbsp;
        </span>
      </p>
      <p css={sharedStyles.AddressLine}>
        <span
          css={[styles.AddressLines, styles.AddressLine3] as CSSPrimitive[]}
        >
          &nbsp;
        </span>
      </p>
      <p css={sharedStyles.AddressLine}>&nbsp;</p>

      <button
        type="button"
        css={[sharedStyles.ActionButton, styles.AddressBtns] as CSSPrimitive[]}
      >
        <span
          css={[styles.AddressLines, styles.AddressBtnsTxt] as CSSPrimitive[]}
        />
      </button>
      <button
        type="button"
        css={[sharedStyles.ActionButton, styles.AddressBtns] as CSSPrimitive[]}
      >
        <span
          css={[styles.AddressLines, styles.AddressBtnsTxt] as CSSPrimitive[]}
        />
      </button>
    </div>
  )
}
