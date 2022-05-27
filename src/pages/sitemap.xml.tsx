import * as React from 'react'

import { useSitemap } from '@hooks/use-sitemap'

export function SitemapXML(): React.ReactElement {
  const sitemap = useSitemap()

  return (
    <ul>
      {sitemap.map((link) => (
        <li key={link}>{link}</li>
      ))}
    </ul>
  )
}
