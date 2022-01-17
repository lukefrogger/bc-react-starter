import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Clickable } from 'reakit/Clickable'
import { Menu, MenuButton, MenuItem, useMenuState } from 'reakit/Menu'
import { submenuLinks } from 'src/routers'

import * as Icons from '../header/icons'
import * as styles from './styles'

export const UserMenuDesktop = ({
  isLoggedIn,
  onLogout,
}: {
  isLoggedIn: boolean
  onLogout: () => void
}): React.ReactElement => {
  const { t } = useTranslation()
  const userMenu = useMenuState()

  const handleLogout = (): void => {
    userMenu.hide()
    onLogout()
  }

  return (
    <>
      {isLoggedIn ? (
        <MenuButton
          {...userMenu}
          css={styles.userButton}
          title={t('profile.title', 'Account profile')}
        >
          <Icons.User />
          <Icons.Arrow orientation={userMenu.visible ? 'up' : 'down'} />
        </MenuButton>
      ) : (
        <Link css={styles.button} title={t('title.login', 'Login')} to="/login">
          <Icons.User />
        </Link>
      )}
      <Menu
        {...userMenu}
        hideOnClickOutside
        css={styles.userMenu}
        aria-label={t('submenu.user_menu', 'User menu')}
      >
        {submenuLinks.map((link) => (
          <MenuItem
            key={link.labelKey}
            {...userMenu}
            as={Link}
            to={link.to}
            onClick={userMenu.hide}
            css={styles.userMenuItem}
            title={t(link.labelKey, link.labelDefault)}
          >
            {t(link.labelKey, link.labelDefault)}
          </MenuItem>
        ))}
        <MenuItem
          {...userMenu}
          as={Link}
          to="/"
          onClick={handleLogout}
          css={styles.userMenuItem}
          title={t('btn.logout', 'Logout')}
        >
          {t('btn.logout', 'Logout')}
        </MenuItem>
      </Menu>
    </>
  )
}

export const UserMenuMobile = ({
  isLoggedIn,
  onLogout,
  onDialogHide,
}: {
  isLoggedIn: boolean
  onLogout: () => void
  onDialogHide: () => void
}): React.ReactElement => {
  const { t } = useTranslation()
  const [isCollapsed, setCollapsed] = React.useState(true)

  return (
    <>
      {isLoggedIn ? (
        <Clickable
          onClick={() => setCollapsed(!isCollapsed)}
          css={styles.category}
        >
          <Icons.User />
          <Icons.Arrow orientation={isCollapsed ? 'down' : 'up'} />
        </Clickable>
      ) : (
        <Link
          css={styles.category}
          to="/login"
          title={t('title.login', 'Login')}
          onClick={onDialogHide}
        >
          <Icons.User />
        </Link>
      )}

      {!isCollapsed && isLoggedIn && (
        <>
          {submenuLinks.map((link) => (
            <Link
              key={link.labelKey}
              to={link.to}
              onClick={onDialogHide}
              css={styles.userMenuItem}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <Link
            to="/"
            title={t('btn.logout', 'Logout')}
            onClick={onLogout}
            css={styles.logoutMobile}
          >
            {t('btn.logout', 'Logout')}
          </Link>
        </>
      )}
    </>
  )
}
