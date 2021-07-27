import * as React from 'react'

import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import useLogout from '@bigcommerce/storefront-data-hooks/use-logout'
import { useTheme } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { Clickable } from 'reakit/Clickable'
import { Dialog, DialogDisclosure, useDialogState } from 'reakit/Dialog'
import { Menu, MenuButton, MenuItem, useMenuState } from 'reakit/Menu'
import { submenuLinks } from 'src/routers'

import { useCartBadge, useCategories } from '@hooks'

import { HeaderItem } from './header--item'
import * as Icons from './icons'
import { Logo } from './logo'
import * as styles from './styles'

export function Header(): React.ReactElement {
  const { t } = useTranslation()
  const logout = useLogout()
  const theme = useTheme()
  const userMenu = useMenuState()
  const { data: customer } = useCustomer()
  const [isMobileUserOpen, setMobileUserOpen] = React.useState(false)
  const dialog = useDialogState({ animated: true })
  const isMobile = !useMediaQuery({
    query: theme.mq[2].substring('@media '.length),
  })

  const badge = useCartBadge()
  const { data } = useCategories()

  const handleLogout = (): void => {
    userMenu.hide()
    logout()
  }

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

            {customer ? (
              <Clickable
                {...userMenu}
                onClick={() => setMobileUserOpen(!isMobileUserOpen)}
                css={styles.category}
              >
                <Icons.User />
                <Icons.Arrow orientation={isMobileUserOpen ? 'up' : 'down'} />
              </Clickable>
            ) : (
              <Link css={styles.category} to="/login" onClick={dialog.hide}>
                <Icons.User />
              </Link>
            )}

            {isMobileUserOpen && customer && (
              <>
                {submenuLinks.map((link) => (
                  <Link
                    key={link.labelKey}
                    to={link.to}
                    onClick={userMenu.hide}
                    css={styles.userMenuItem}
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
                <Link to="/" onClick={handleLogout} css={styles.userMenuItem}>
                  {t('btn.logout', 'Logout')}
                </Link>
              </>
            )}
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
            <HeaderItem category={category} behaviour="popover" />
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
          <span css={styles.badge}>{badge}</span>
          <Icons.Bag />
        </Link>
        {!isMobile && (
          <>
            {customer ? (
              <MenuButton {...userMenu} css={styles.userButton}>
                <Icons.User />
                <Icons.Arrow orientation={userMenu.visible ? 'up' : 'down'} />
              </MenuButton>
            ) : (
              <Link css={styles.button} to="/login">
                <Icons.User />
              </Link>
            )}
            <Menu
              {...userMenu}
              hideOnClickOutside
              css={styles.userMenu}
              aria-label="User menu"
            >
              {submenuLinks.map((link) => (
                <MenuItem
                  key={link.labelKey}
                  {...userMenu}
                  as={Link}
                  to={link.to}
                  onClick={userMenu.hide}
                  css={styles.userMenuItem}
                >
                  {t(link.labelKey)}
                </MenuItem>
              ))}
              <MenuItem
                {...userMenu}
                as={Link}
                to="/"
                onClick={handleLogout}
                css={styles.userMenuItem}
              >
                {t('btn.logout', 'Logout')}
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  )
}
