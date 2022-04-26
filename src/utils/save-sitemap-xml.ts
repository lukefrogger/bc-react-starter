import { Readable } from 'stream'

import { SitemapStream, streamToPromise } from 'sitemap'

import { useSitemap } from '@hooks/sitemap/use-sitemap'

// eslint-disable-next-line react-hooks/rules-of-hooks
const links = useSitemap()
const stream = new SitemapStream({ hostname: process.env.PUBLIC_URL })

// Return a promise that resolves with your XML string
streamToPromise(Readable.from(links).pipe(stream))
  .then((data) => data.toString())
  // eslint-disable-next-line no-console
  .catch(console.error)
