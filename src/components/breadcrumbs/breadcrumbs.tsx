import * as React from 'react'

import { Link } from 'react-router-dom'
import { Role } from 'reakit/Role'

import * as styles from './styles'

export function Breadcrumbs({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <Role css={styles.container} aria-label="breadcrumb">
      {children}
    </Role>
  )
}

Breadcrumbs.Item = ({
  to,
  children,
}: {
  to?: string
  children: React.ReactNode
}) => (
  <Role as="span" css={styles.link} {...(to && { to, as: Link })}>
    {children}
  </Role>
)
