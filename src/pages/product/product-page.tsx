import React from 'react'

import { useParams } from 'react-router-dom'

import { NoMatch404, ProductLoading } from '@components'
import { useProduct } from '@hooks'

import { Product } from './product'

type ProductPageParams = {
  slug: string
}

export function ProductPage(): React.ReactElement {
  const { slug } = useParams<ProductPageParams>()
  const { data: product, error } = useProduct(slug || '')
  const isLoading = !product && !error

  if (isLoading) {
    return <ProductLoading />
  }

  if (error) {
    return <NoMatch404 />
  }

  return <Product slug={slug || ''} />
}
