import { useLocalStorage } from '@rehooks/local-storage'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { stripHtml } from 'string-strip-html'
import useSWR, { SWRResponse } from 'swr'

import { REACT_APP_API_ENDPOINT } from '@config/constants'

const DISMISSED_BANNER_IDS = 'dismissed-banners-ids'

type Banner = {
  /**
   * Id of the banner.
   */
  id: number
  /**
   * Date the banner is created.
   */
  date_created?: string
  /**
   * If the banner is on a specific category or brand page then the `item_id` will correspond the category or brand id.
   */
  item_id?: string
  /**
   * Name of the banner.
   */
  name: string
  /**
   * Contains the banner content. Returned as a string and includes HTML formatting.
   */
  content: string
  /**
   * Page the Banner is located on.
   */
  page: 'home_page' | 'category_page' | 'brand_page' | 'search_page'
  /**
   * Location on the page.
   */
  location: 'top' | 'bottom'
  /**
   * This specifies whether the banner should be visible during a specific date range.
   */
  date_type: 'always' | 'custom'
  /**
   * If the datetype is set as 'custom’, this field specifies the date when the banner should become visible on the storefront.
   */
  date_from?: string
  /**
   * If the datetype is set as 'custom’, this field specifies the date when the banner should stop being visible on the storefront.
   */
  date_to?: string
  /**
   * Integer value denoting whether or not the banner is visible on the storefront: 1 = visible; 0 = not visible
   */
  visible?: string
}

type UseBanners = SWRResponse<Banner[] | undefined, Error> & {
  onBannerClose: (id: number) => void
}

const fetcher = async (): Promise<Banner[] | undefined> => {
  const { data } = await axios(
    `${REACT_APP_API_ENDPOINT}/api/bigcommerce/banners`
  )
  return data
}

export function useBanners(): UseBanners {
  const banners = useSWR(['banners'], fetcher)
  const location = useLocation()
  const [dismissedBanners, setDismissedBanners] = useLocalStorage<number[]>(
    DISMISSED_BANNER_IDS,
    []
  )
  const respectLocation = (banner: Banner): boolean => {
    if (banner.page === 'home_page' && location.pathname === '/') {
      return true
    }
    if (
      banner.page === 'category_page' &&
      (location.pathname.includes('categories') ||
        location.pathname.includes('category'))
    ) {
      return true
    }
    if (banner.page === 'search_page' && location.pathname.includes('search')) {
      return true
    }
    return false
  }

  return {
    ...banners,
    data: banners?.data
      ?.filter((banner) => banner.visible === '1')
      .filter((banner) => !dismissedBanners.includes(banner.id))
      .filter(respectLocation)
      .map((banner) => ({
        ...banner,
        content: stripHtml(banner.content || '').result,
      })),
    onBannerClose: (id) => {
      setDismissedBanners([...dismissedBanners, id])
    },
  }
}
