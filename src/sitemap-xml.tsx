import React, { ReactElement, useEffect } from 'react'

import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'
import ReactDOM from 'react-dom'
import { mutate } from 'swr'
import { create } from 'xmlbuilder2'

import { siteInfoFetcher } from '@hooks'
import { useSitemap } from '@hooks/sitemap/use-sitemap'

import './i18n'

const Sitemap = (): ReactElement => {
  const links = useSitemap()
  useEffect(() => {
    const allLinks = links.filter((link) => link)
    if (!allLinks?.length) {
      return
    }

    const sitemapIndexXML = create({ version: '1.0', encoding: 'UTF-8' })
    const sitemapIndexXMLUP = sitemapIndexXML.ele('sitemapindex', {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    })
    allLinks.forEach((link) => {
      sitemapIndexXMLUP.ele('sitemap').ele('loc').txt(link).up()
    })

    const xml = sitemapIndexXML.end({ prettyPrint: true })

    // TODO: write out xml to file
    // eslint-disable-next-line no-console
    console.log(xml)
  }, [links])

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
