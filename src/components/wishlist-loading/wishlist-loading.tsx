import * as React from 'react'

import * as sharedStyles from '../wishlist-row/styles'
import * as styles from './styles'

export function WishlistLoading(): React.ReactElement {
  return (
    <div css={sharedStyles.container}>
      <div css={sharedStyles.columnLeft}>
        <span css={styles.wishlistName}>&nbsp;</span>
        <span css={styles.wishlistItem}>&nbsp;</span>
      </div>
      <div css={sharedStyles.columnRight}>
        <span css={styles.wishlistType}>&nbsp;</span>
        <div css={styles.wishlistActions}>
          <span css={styles.wishlistAction}>&nbsp;</span>
          <span css={styles.wishlistAction}>&nbsp;</span>
          <span css={styles.wishlistAction}>&nbsp;</span>
        </div>
      </div>
    </div>
  )
}
