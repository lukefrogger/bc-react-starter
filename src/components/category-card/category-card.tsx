import * as React from 'react'

import { Link, LinkProps } from 'react-router-dom'

import * as styles from './styles'

type CategoryCardProps = {
  to: LinkProps['to']
  label?: string
  image?: string
}

export function CategoryCard(props: CategoryCardProps): React.ReactElement {
  return (
    <Link to={props.to} css={styles.Card(props.image)}>
      {props.label}
    </Link>
  )
}
