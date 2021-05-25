import { useMemo, useState } from 'react'

import {
  getDismissedBannerIds,
  setDismissedBannerId,
} from '../utils/local-storage'

type UseBannersType = () => {
  banner: { id: number; content: string } | null
  onBannerClose: () => void
}

export const useBanners: UseBannersType = () => {
  // TODO: API request
  const banner = { id: 1, content: 'Free international shipping on $50+' }
  const dismissedBanners = useMemo(getDismissedBannerIds, [])
  const activeBanner = !dismissedBanners.includes(banner.id) ? banner : null
  const [isBannerVisible, setBannerVisible] = useState(!!activeBanner)

  return {
    banner: isBannerVisible ? activeBanner : null,
    onBannerClose: () => {
      if (!activeBanner) return
      setBannerVisible(false)
      setDismissedBannerId(activeBanner.id)
    },
  }
}
