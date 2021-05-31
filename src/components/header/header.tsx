import * as React from 'react'

import { useTheme } from '@emotion/react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { Dialog, DialogDisclosure, useDialogState } from 'reakit/Dialog'

import { useCartBadge, useCategories } from '@hooks'

import { HeaderItem } from './header--item'
import * as Icons from './icons'
import { Logo } from './logo'
import * as styles from './styles'

export function Header(): React.ReactElement {
  const theme = useTheme()
  const dialog = useDialogState({ animated: true })
  const isMobile = !useMediaQuery({
    query: theme.mq[2].substring('@media '.length),
  })

  const badge = useCartBadge()
  const categories = useCategories()

  return (
    <div css={styles.container}>
      {isMobile && (
        <div css={styles.section}>
          <DialogDisclosure css={styles.icon} {...dialog}>
            {dialog.visible ? <Icons.Close /> : <Icons.Hamburger />}
          </DialogDisclosure>
          <Dialog {...dialog} css={styles.mobileMenu} aria-label="Welcome">
            {categories.map((category) => (
              <HeaderItem
                category={category}
                behaviour="disclosure"
                onClick={dialog.hide}
              />
            ))}
            <Link css={styles.category} to="/search" onClick={dialog.hide}>
              <Icons.Search />
            </Link>
            <Link css={styles.category} to="profile" onClick={dialog.hide}>
              <Icons.User />
            </Link>
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
          {categories.map((category) => (
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
          <Link css={styles.button} to="/profile">
            <Icons.User />
          </Link>
        )}
      </div>
    </div>
  )
}
