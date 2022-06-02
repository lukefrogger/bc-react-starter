import { createWriteStream } from 'fs'

import React, { ReactElement, useEffect, useState } from 'react'

import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'
import ReactDOM from 'react-dom'
import { SitemapStream } from 'sitemap'
import { mutate } from 'swr'

import { siteInfoFetcher } from '@hooks'
import { useSitemap } from '@hooks/use-sitemap'

import './i18n'

const Sitemap = (): ReactElement => {
  const links = useSitemap()
  const [isSitemapGenerated, setIsSitemapGenerated] = useState(false)

  useEffect(() => {
    if (!isSitemapGenerated) {
      if (!links?.length) {
        return
      }

      setIsSitemapGenerated(true)

      const sitemapStream = new SitemapStream({
        hostname: process.env.REACT_APP_HOSTNAME,
      })

      const writeStream = createWriteStream('./public/sitemap.xml', {
        flags: 'w',
      })

      sitemapStream.pipe(writeStream)

      links.forEach((link) => {
        sitemapStream.write(link)
      })

      sitemapStream.end()
    }
  }, [isSitemapGenerated, links])

  return <div />
}

export const render = async (): Promise<void> => {
  const data = await siteInfoFetcher()
  await mutate('site-info', Promise.resolve(data))

  ReactDOM.render(
    <CommerceProvider
      locale="en-US"
      base={process.env.REACT_APP_API_ENDPOINT}
      credentials="include"
    >
      <Sitemap />
    </CommerceProvider>,
    document.getElementById('root')
  )
}

render()
