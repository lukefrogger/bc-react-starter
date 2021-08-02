import * as React from 'react'

import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import useLogout from '@bigcommerce/storefront-data-hooks/use-logout'
import { useTheme } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { Dialog, DialogDisclosure, useDialogState } from 'reakit/Dialog'

import { UserMenuDesktop, UserMenuMobile } from '@components/user-menu'
import { useCartBadge, useCategories } from '@hooks'

import { HeaderItem } from './header--item'
import * as Icons from './icons'
import { Logo } from './logo'
import * as styles from './styles'

export function Header(): React.ReactElement {
  const { t } = useTranslation()
  const logout = useLogout()
  const theme = useTheme()
  const { data: customer } = useCustomer()
  const dialog = useDialogState({ animated: true })
  const isMobile = !useMediaQuery({
    query: theme.mq[2].substring('@media '.length),
  })

  const badge = useCartBadge()
  const { data } = useCategories()

  return (
    <div css={styles.container}>
      {isMobile && (
        <div css={styles.section}>
          <DialogDisclosure css={styles.icon} {...dialog}>
            {dialog.visible ? <Icons.Close /> : <Icons.Hamburger />}
          </DialogDisclosure>
          <Dialog {...dialog} css={styles.mobileMenu} aria-label="Welcome">
            {data?.map((category) => (
              <HeaderItem
                key={category.slug}
                category={category}
                behaviour="disclosure"
                onClick={dialog.hide}
              />
            ))}
            <Link css={styles.category} to="/search" onClick={dialog.hide}>
              <Icons.Search />
            </Link>
            <UserMenuMobile
              isLoggedIn={!!customer}
              onLogout={logout}
              onDialogHide={dialog.hide}
            />
          </Dialog>
        </div>
      )}
      <div css={styles.section}>
        <Link css={styles.logo} to="/">
          <Logo />
        </Link>
      </div>
      {!isMobile && (
        <div css={styles.desktopMenu}>
          {data?.map((category) => (
            <HeaderItem
              category={category}
              behaviour="popover"
              key={category.id}
            />
          ))}
        </div>
      )}
      <div css={styles.section}>
        {!isMobile && (
          <Link css={styles.button} to="/search">
            <Icons.Search />
          </Link>
        )}
        <Link css={styles.button} to="/cart">
          {badge && <span css={styles.badge}>{badge}</span>}
          <Icons.Bag />
        </Link>
        {!isMobile && (
          <UserMenuDesktop isLoggedIn={!!customer} onLogout={logout} />
        )}
      </div>
    </div>
  )
}
