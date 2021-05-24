enum STORAGE_KEYS {
    DISMISSED_BANNER_IDS = 'dismissedBannerIds',
}

export const getDismissedBannerIds = () =>
    JSON.parse(localStorage.getItem(STORAGE_KEYS.DISMISSED_BANNER_IDS) || '[]');

export const setDismissedBannerId = (id: number) =>
    localStorage.setItem(
        STORAGE_KEYS.DISMISSED_BANNER_IDS,
        JSON.stringify([...getDismissedBannerIds(), id])
    );
