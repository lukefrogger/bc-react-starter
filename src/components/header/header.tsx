import * as React from 'react'

import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { Button } from 'reakit/Button'
import { Dialog, DialogDisclosure, useDialogState } from 'reakit/Dialog'

import { useCartBadge, useCategories } from '@hooks'

import * as Icons from './icons'
import { Logo } from './logo'
import * as styles from './styles'

export function Header(): React.ReactElement {
  const dialog = useDialogState({ animated: true })
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })

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
              <Link
                css={styles.category}
                to={`category/${category.slug}`}
                onClick={dialog.hide}
              >
                {category.label}
              </Link>
            ))}
            <Link css={styles.category} to="profile" onClick={dialog.hide}>
              <Icons.User />
            </Link>
          </Dialog>
        </div>
      )}
      <div css={styles.section}>
        <Logo />
      </div>
      {!isMobile && (
        <div css={styles.desktopMenu}>
          {categories.map((category) => (
            <Link css={styles.category} to={`category/${category.slug}`}>
              {category.label}
            </Link>
          ))}
        </div>
      )}
      <div css={styles.section}>
        <Button css={styles.button}>
          <span css={styles.badge}>{badge}</span>
          <Icons.Bag />
        </Button>
        {!isMobile && (
          <Button css={styles.button}>
            <Icons.User />
          </Button>
        )}
      </div>
    </div>
  )
}
