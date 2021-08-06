import * as React from 'react'

import * as styles from './styles'

export function OrderLoading(): React.ReactElement {
  const productArray = [1, 2]
  return (
    <div css={styles.OrderRow}>
      <div css={styles.Header}>
        <span css={styles.OrderNumber}>&nbsp;</span>
        <span css={styles.OrderStatus}>&nbsp;</span>
        <span css={styles.OrderDetails}>&nbsp;</span>
      </div>
      <div css={styles.Products}>
        {productArray?.map((product) => (
          <div css={styles.ProductDetails} key={product}>
            <span css={styles.ProductImage}>&nbsp;</span>
            <div css={styles.ProductWrapper}>
              <span css={styles.ProductName}>&nbsp;</span>
              <span css={styles.ProductDesc}>&nbsp;</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div css={styles.InfoRow}>
          <span css={styles.Ordered}>&nbsp;</span>
          <span css={styles.OrderedDate}>&nbsp;</span>
        </div>
        <div css={styles.InfoRow}>
          <span css={styles.OrderedTotal}>&nbsp;</span>
          <span css={styles.OrderedPrice}>&nbsp;</span>
        </div>
      </div>
    </div>
  )
}
