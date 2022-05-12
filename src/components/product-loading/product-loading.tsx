import * as React from 'react'

import * as sharedStyles from '../../pages/product/styles'
import * as styles from './styles'

export function ProductLoading(): React.ReactElement {
  return (
    <div css={styles.container} id="content">
      <div css={sharedStyles.grid(false)}>
        <div css={styles.galleryWrapper}>
          <div className="image-gallery-thumbnails-wrapper left">
            <span css={styles.galleryThumbnail} />
            <span css={styles.galleryThumbnail} />
            <span css={styles.galleryThumbnail} />
          </div>
          <span css={styles.galleryImage}>&nbsp;</span>
        </div>
        <div css={sharedStyles.product}>
          <div css={sharedStyles.productDescription}>
            <span css={styles.productBrand}>&nbsp;</span>
            <span css={styles.productName}>&nbsp;</span>
            <span css={styles.productPrice}>&nbsp;</span>
            <span css={styles.productRating}>&nbsp;</span>
            <span css={styles.productOption}>&nbsp;</span>
            <span css={styles.productAddToCart}>&nbsp;</span>
          </div>
        </div>
      </div>
      <div css={sharedStyles.productDetail}>
        <div css={styles.productDetailRow}>
          <div css={styles.productDetailColumnLeft}>
            <span css={styles.productDetailLabel}>&nbsp;</span>
          </div>
          <div css={styles.productDetailColumnRight}>
            <span css={styles.productDetailLine1}>&nbsp;</span>
            <span css={styles.productDetailLine2}>&nbsp;</span>
            <span css={styles.productDetailLine3}>&nbsp;</span>
          </div>
        </div>
        <div css={styles.productDetailRow}>
          <div css={styles.productDetailColumnLeft}>
            <span css={styles.productDetailLabel}>&nbsp;</span>
          </div>
          <div css={styles.productDetailColumnRight}>
            <span css={styles.productDetailLine1}>&nbsp;</span>
            <span css={styles.productDetailLine2}>&nbsp;</span>
            <span css={styles.productDetailLine3}>&nbsp;</span>
          </div>
        </div>
        <div css={styles.productDetailRow}>
          <div css={styles.productDetailColumnLeft}>
            <span css={styles.productDetailLabel}>&nbsp;</span>
          </div>
          <div css={styles.productDetailColumnRight}>
            <span css={styles.productDetailLine1}>&nbsp;</span>
            <span css={styles.productDetailLine2}>&nbsp;</span>
            <span css={styles.productDetailLine3}>&nbsp;</span>
          </div>
        </div>
      </div>
    </div>
  )
}
