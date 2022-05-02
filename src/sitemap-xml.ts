import { create } from 'xmlbuilder2'

import { useSitemap } from '@hooks/sitemap/use-sitemap'

// eslint-disable-next-line react-hooks/rules-of-hooks
const links = useSitemap()

const obj = {
  urlset: [
    // <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {
      _attr: {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      },
    },
    links.map((link) => ({
      url: {
        loc: link,
      },
    })),
  ],
}

const doc = create(obj)
const xml = doc.end({ prettyPrint: true })

// eslint-disable-next-line no-console
console.log(xml)

// eslint-disable-next-line import/no-default-export
export default xml
