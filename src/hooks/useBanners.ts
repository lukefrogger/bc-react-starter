import { useMemo, useState } from 'react';
import {
    getDismissedBannerIds,
    setDismissedBannerId,
} from '../utils/local-storage';

const useBanners = () => {
    // TODO: API request
    const banner = { id: 1, content: 'Free international shipping on $50+' };
    const dismissedBanners = useMemo(getDismissedBannerIds, []);
    const activeBanner = !dismissedBanners.includes(banner.id) ? banner : null;
    const [isBannerVisible, setBannerVisible] = useState(!!activeBanner);

    return {
        banner: isBannerVisible ? activeBanner : null,
        onBannerClose: () => {
            if (!activeBanner) return;
            setBannerVisible(false);
            setDismissedBannerId(activeBanner.id);
        },
    };
};

export default useBanners;
