import React from 'react'

import partial from 'lodash/partial'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { DialogStateReturn, useDialogState } from 'reakit/Dialog'
import { Role, RoleProps } from 'reakit/Role'
import { Button } from 'unsafe-bc-react-components'

import { WishlistDialog } from '@components'
import { useUpdateWishlist } from '@hooks'

import * as styles from './styles'

type Wishlist = {
  id?: number
  customer_id?: number
  name?: string
  is_public?: boolean
  items?: { id?: number; product_id?: number }[]
}

export type WishlistRowProps = RoleProps & {
  wishlist: Wishlist
  onWishlistAction: (action: string, wishlist: Wishlist) => void
}

export function WishlistRow(props: WishlistRowProps): React.ReactElement {
  const { wishlist, onWishlistAction: defaultOnWishlistAction, ...rest } = props
  const { t } = useTranslation()
  const dialog = useDialogState()
  const updateWishlist = useUpdateWishlist()

  return (
    <>
      <Role as="div" css={styles.container} {...rest}>
        <div css={styles.columnLeft}>
          <Link to={`/user/wishlists/${wishlist.id}`} css={styles.name}>
            {wishlist.name}
          </Link>
          <span css={styles.items}>
            {wishlist?.items?.length}{' '}
            {t('bc.wish_list.item', 'item', { count: wishlist?.items?.length })}
          </span>
        </div>
        <div css={styles.columnRight}>
          <WishlistStatus {...props} />
          <WishlistActions {...props} dialog={dialog} />
        </div>
      </Role>
      <WishlistDialog
        {...dialog}
        title={t('bc.wish_list.edit', 'Edit wish list')}
        button={t('bc.wish_list.edit', 'Edit wish list')}
        initialValues={{
          name: wishlist.name || '',
          isPublic: wishlist.is_public || false,
        }}
        onSubmit={async ({ isPublic, name }) => {
          if (!wishlist.id) {
            throw new Error('Wishlist id not found')
          }
          await updateWishlist({
            isPublic,
            name,
            wishlistId: wishlist.id,
          })
          dialog.hide()
        }}
      />
    </>
  )
}

export type WishlistActionsProps = WishlistRowProps & {
  dialog?: DialogStateReturn
}

export function WishlistActions(
  props: WishlistActionsProps
): React.ReactElement {
  const { onWishlistAction, wishlist, dialog } = props
  const { t } = useTranslation()

  const { is_public: isPublic } = wishlist

  return (
    <span css={styles.actions}>
      {isPublic && (
        <Button
          css={styles.action}
          variant="link"
          onClick={() =>
            navigator.clipboard.writeText(
              `${window.location.origin}/user/wishlists/${wishlist.id}`
            )
          }
        >
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <path
              d="M2 10A1.333 1.333 0 01.667 8.667V3.333A1.333 1.333 0 012 2h8a1.333 1.333 0 011.334 1.333v5.334A1.333 1.333 0 0110 10H7.334"
              stroke="#8E8E8E"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 6a1.333 1.333 0 011.334 1.333v5.334A1.333 1.333 0 0114 14H6a1.333 1.333 0 01-1.333-1.333V7.333A1.333 1.333 0 016 6h2.667"
              stroke="#8E8E8E"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t('bc.btn.copy_link', 'Copy link')}
        </Button>
      )}
      <Button css={styles.action} variant="link" onClick={dialog?.show}>
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
          <path
            d="M13 7L9 3M5.5 14.5l-5 1 1-5 10-10 4 4-10 10z"
            stroke="#8E8E8E"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {t('bc.btn.edit', 'Edit')}
      </Button>
      <Button
        css={styles.action}
        variant="link"
        onClick={partial(onWishlistAction, 'delete', wishlist)}
      >
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
          <path
            d="M.667 3.333h14.667M6 3.333V.667h4v2.666M12.667 6v8a1.333 1.333 0 01-1.333 1.333H4.667A1.333 1.333 0 013.334 14V6"
            stroke="#8E8E8E"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {t('bc.btn.delete', 'Delete')}
      </Button>
    </span>
  )
}

export type WishlistStatusProps = Omit<WishlistRowProps, 'onWishlistAction'>

export function WishlistStatus(props: WishlistStatusProps): React.ReactElement {
  const { wishlist } = props

  const { t } = useTranslation()

  const { is_public: isPublic } = wishlist
  return (
    <span css={styles.status}>
      {isPublic ? (
        <>
          <svg width={15} height={15} viewBox="0 0 15 15" fill="none">
            <path
              d="M7.5 14.5c1.657 0 3-3.134 3-7s-1.343-7-3-7-3 3.134-3 7 1.343 7 3 7zM.5 7.5h14"
              stroke="#8E8E8E"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 14.5a7 7 0 100-14 7 7 0 000 14z"
              stroke="#8E8E8E"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t('bc.wish_list.public', 'Public')}
        </>
      ) : (
        <>
          <svg width={14} height={16} viewBox="0 0 14 16" fill="none">
            <path
              d="M12.5 15.5h-11a1 1 0 01-1-1v-7a1 1 0 011-1h11a1 1 0 011 1v7a1 1 0 01-1 1zM3.5 6.5V4A3.5 3.5 0 017 .5v0A3.5 3.5 0 0110.5 4v2.5"
              stroke="#8E8E8E"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 12.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              stroke="#8E8E8E"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t('bc.wish_list.private', 'Private')}
        </>
      )}
    </span>
  )
}
