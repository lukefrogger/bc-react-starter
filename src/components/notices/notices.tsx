import React from 'react'

import { Banner } from 'unsafe-bc-react-components'

import { useBanners } from '@hooks'

export function Notices(): React.ReactElement {
  const { data: banners, onBannerClose } = useBanners()
  return (
    <>
      {banners?.map((banner) => {
        return (
          <Banner
            position={banner.location}
            onClose={() => onBannerClose(banner.id)}
            key={banner.id}
          >
            {banner.content}
          </Banner>
        )
      })}
    </>
  )
}
