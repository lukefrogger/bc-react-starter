import * as React from 'react'

import { Link } from 'react-router-dom'

import * as styles from './styles'

export type SubmenuProps = {
  children: React.ReactNode
}

export type SubmenuLinkProps = {
  to: string
  children: React.ReactNode
  isActive?: boolean
}

export const Submenu = ({ children }: SubmenuProps): React.ReactElement => (
  <div css={styles.Container}>{children}</div>
)

Submenu.Link = React.forwardRef(
  (
    { to, children, isActive = false }: SubmenuLinkProps,
    ref?: React.Ref<HTMLAnchorElement>
  ): React.ReactElement => (
    <Link innerRef={ref} css={styles.Link(isActive)} to={to}>
      {children}
    </Link>
  )
)
