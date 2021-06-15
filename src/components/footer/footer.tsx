import * as React from 'react'

import { Link, LinkProps } from 'react-router-dom'

import { Logo } from '../header/logo'
import { FooterSocial as Social } from './footer--social'
import * as styles from './styles'

type FooterLink = {
  label: string
  key: string
  to: LinkProps<unknown>['to']
}

const CATEGORIES_PAGES: FooterLink[] = [
  {
    label: 'Clothing',
    key: 'clothing',
    to: '/',
  },
  {
    label: 'Shoes',
    key: 'shoes',

    to: '/',
  },
  {
    label: 'Accessories',
    key: 'accessories',
    to: '/',
  },
  {
    label: 'Trending now',
    key: 'trending',
    to: '/',
  },
]

const LEGAL_PAGES: FooterLink[] = [
  {
    label: 'Shipping',
    key: 'shipping',
    to: '/',
  },
  {
    label: 'Return',
    key: 'return',
    to: '/',
  },
  {
    label: 'Guarantee',
    key: 'guarantee',
    to: '/',
  },
  {
    label: 'Privacy policy',
    key: 'privacy-policy',
    to: '/',
  },
]

const STORE_PAGES: FooterLink[] = [
  {
    label: 'About us',
    key: 'about-us',
    to: '/',
  },
  {
    label: 'Help',
    key: 'help',
    to: '/',
  },
  {
    label: 'Contact us',
    key: 'contact-us',
    to: '/',
  },
]

const EMAIL = 'info@stellar-shop.io'
const TELEPHONE = '0-800-42-STELLAR'

export function Footer(): React.ReactElement {
  return (
    <div css={styles.container}>
      <Logo width="100%" />
      <div css={styles.wrapper}>
        <div css={styles.group}>
          {CATEGORIES_PAGES.map((item) => {
            return (
              <Link key={item.key} to={item.to} css={styles.link}>
                {item.label}
              </Link>
            )
          })}
        </div>
        <div css={styles.group}>
          {LEGAL_PAGES.map((item) => {
            return (
              <Link key={item.key} to={item.to} css={styles.link}>
                {item.label}
              </Link>
            )
          })}
        </div>
        <div css={styles.group}>
          {STORE_PAGES.map((item) => {
            return (
              <Link key={item.key} to={item.to} css={styles.link}>
                {item.label}
              </Link>
            )
          })}
        </div>
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
        <p>Powered by WordPress</p>
        <p>© All rights reserved, Modern Tribe</p>
      </div>
    </div>
  )
}
