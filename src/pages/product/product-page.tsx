import React from 'react'

import { useParams } from 'react-router-dom'

import { NoMatch404 } from '@components'
import { useProduct } from '@hooks'

import { Product } from './product'

type ProductPageParams = {
  slug: string
}

export function ProductPage(): React.ReactElement {
  const { slug } = useParams<ProductPageParams>()
  const { data: product } = useProduct(slug || '')

  if (!product) {
    return <NoMatch404 />
  }

  return <Product slug={slug || ''} />
}
