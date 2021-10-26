import React from 'react'

import { useLocation } from 'react-router-dom'
import { Banner } from 'unsafe-bc-react-components'

import { useBanners } from '@hooks'

export function Notices(): React.ReactElement {
  const { data: banners, onBannerClose } = useBanners()
  const location = useLocation()
  return (
    <>
      {banners?.map((banner) => {
        if (banner.page === 'home_page' && location.pathname === '/') {
          return (
            <Banner
              position={banner.location}
              onClose={() => onBannerClose(banner.id)}
              key={banner.id}
            >
              {banner.content}
            </Banner>
          )
        }
        if (
          banner.page === 'category_page' &&
          (location.pathname.includes('categories') ||
            location.pathname.includes('category'))
        ) {
          return (
            <Banner
              position={banner.location}
              onClose={() => onBannerClose(banner.id)}
              key={banner.id}
            >
              {banner.content}
            </Banner>
          )
        }
        if (
          banner.page === 'search_page' &&
          location.pathname.includes('search')
        ) {
          return (
            <Banner
              position={banner.location}
              onClose={() => onBannerClose(banner.id)}
              key={banner.id}
            >
              {banner.content}
            </Banner>
          )
        }
        return null
      })}
    </>
  )
}
