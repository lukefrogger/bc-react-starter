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
        <Link css={styles.category} to="/login" onClick={onDialogHide}>
          <Icons.User />
        </Link>
      )}

      {!isCollapsed && isLoggedIn && (
        <>
          {submenuLinks.map((link) => (
            <Link key={link.labelKey} to={link.to} css={styles.userMenuItem}>
              {t(link.labelKey)}
            </Link>
          ))}
          <Link to="/" onClick={onLogout} css={styles.userMenuItem}>
            {t('btn.logout', 'Logout')}
          </Link>
        </>
      )}
    </>
  )
}
