import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useCategories } from '@hooks'

import { Logo } from '../header/logo'
import { FooterSocial as Social } from './footer--social'
import * as styles from './styles'

const EMAIL = 'info@stellar-shop.io'
const TELEPHONE = '0-800-42-STELLAR'

export function Footer(): React.ReactElement {
  const { data: categories } = useCategories()
  const { t } = useTranslation()
  return (
    <div css={styles.container}>
      <Logo width="100%" />
      <div css={styles.wrapper}>
        <div css={styles.group}>
          {categories?.slice(0, 4).map((category) => {
            return (
              <Link
                key={category.path}
                to={`/category${category.path}`}
                css={styles.link}
              >
                {category.name}
              </Link>
            )
          })}
        </div>
        {
          // TODO: Get pages from BG API as categories
        }
        <div css={styles.group}>
          <Link to="/legal/shipping" css={styles.link}>
            {t('footer.shipping', 'Shipping')}
          </Link>
          <Link to="/legal/return" css={styles.link}>
            {t('footer.return', 'Return')}
          </Link>
          <Link to="/legal/guarantee" css={styles.link}>
            {t('footer.guarantee', 'Guarantee')}
          </Link>
          <Link to="/legal/privacy-policy" css={styles.link}>
            {t('footer.privacy_policy', 'Privacy policy')}
          </Link>
        </div>
        <div css={styles.group}>
          <Link to="/about-us" css={styles.link}>
            {t('footer.about_us', 'About us')}
          </Link>
          <Link to="/help" css={styles.link}>
            {t('footer.help', 'Help')}
          </Link>
          <Link to="/contact-us" css={styles.link}>
            {t('footer.contact_us', 'Contact us')}
          </Link>
        </div>
        {
          // TODO: Move to config
        }
        <div css={styles.group}>
          <a
            css={styles.link}
            href={`mailto:${EMAIL}`}
            target="_blank"
            rel="noreferrer"
          >
            {EMAIL}
          </a>
          <span>{TELEPHONE}</span>
          <Social
            instagram="https://www.instagram.com/"
            facebook="https://www.facebook.com/"
            youtube="https://www.youtube.com/"
          />
        </div>
      </div>
      <div css={styles.rights}>
        <p>{t('footer.powered_by', 'Powered by Bigcommerce')}</p>
        <p>{t('footer.rights', '© All rights reserved, Modern Tribe')}</p>
      </div>
    </div>
  )
}
