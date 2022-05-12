import * as React from 'react'

import { useCategories } from '@hooks'

import { RootRoutes } from '../routers/routes'

export type SitemapParams = {
  includeParams: {
    [path: string]: {
      [param: string]: string[] | string
    }
  }
  excludeParams: string[]
}

export function getSitemapLinks(
  routes: React.ReactElement,
  params: SitemapParams
): string[] {
  const paths: React.ReactElement[] = routes.props.children
  const links: string[] = []

  paths.forEach((element: React.ReactNode) => {
    if (!React.isValidElement(element)) {
      return
    }

    if (element.type === React.Fragment) {
      links.push.apply(getSitemapLinks(element.props.children, params))
      return
    }

    if (params.includeParams[element.props.path]) {
      const currentParam = params.includeParams[element.props.path]

      Object.keys(currentParam).forEach((paramKey) => {
        const param = currentParam[paramKey]

        if (Array.isArray(param)) {
          param.forEach((path) =>
            links.push(element.props.path.replace(`/:${paramKey}`, path))
          )
          return
        }

        links.push(element.props.path.replace(`/:${paramKey}`, param))
      })

      return
    }

    if (params.excludeParams.some((param) => param === element.props.path)) {
      return
    }

    links.push(element.props.path)
  })

  return links
}

export function useSitemap(): string[] {
  const categories = useCategories().data
  const categoriesLinks = categories
    ? categories.map((category) => category.path)
    : []
  const links = getSitemapLinks(RootRoutes(), {
    includeParams: {
      '/category/:categories': {
        categories: categoriesLinks,
      },
    },
    excludeParams: [
      '/category/:categories/:subCategories',
      '/category/:categories/:subCategories/:subSubCategories',
      '/product/:slug',
      '/user/*',
      '*',
    ],
  })

  return links
}
