enum StorageKeys {
  DISMISSED_BANNER_IDS = 'dismissedBannerIds',
}

export const getDismissedBannerIds = (): number[] =>
  JSON.parse(localStorage.getItem(StorageKeys.DISMISSED_BANNER_IDS) || '[]')

export const setDismissedBannerId = (id: number): void =>
  localStorage.setItem(
    StorageKeys.DISMISSED_BANNER_IDS,
    JSON.stringify([...getDismissedBannerIds(), id])
  )
