import * as React from 'react'

import { Link, LinkProps } from 'react-router-dom'

import { Logo } from '../header/logo'
import { FooterSocial } from './footer--social'
import * as styles from './styles'

const FOOTER_ITEMS: {
  content: string | React.ReactElement
  key: string
  to?: LinkProps<unknown>['to']
}[][] = [
  [
    {
      content: 'Clothing',
      key: 'clothing',
      to: '/',
    },
    {
      content: 'Shoes',
      key: 'shoes',

      to: '/',
    },
    {
      content: 'Accessories',
      key: 'accessories',
      to: '/',
    },
    {
      content: 'Trending now',
      key: 'trending',
      to: '/',
    },
  ],
  [
    {
      content: 'Shipping',
      key: 'shipping',
      to: '/',
    },
    {
      content: 'Return',
      key: 'return',
      to: '/',
    },
    {
      content: 'Guarantee',
      key: 'guarantee',
      to: '/',
    },
    {
      content: 'Privacy policy',
      key: 'privacy-policy',
      to: '/',
    },
  ],
  [
    {
      content: 'About us',
      key: 'about-us',
      to: '/',
    },
    {
      content: 'Help',
      key: 'help',
      to: '/',
    },
    {
      content: 'Contact us',
      key: 'contact-us',
      to: 'https://mail.google.com/mail/u/0/#inbox',
    },
  ],
  [
    {
      key: 'mail-to',
      content: (
        <a
          css={styles.link}
          href="mailto:info@stellar-shop.io"
          target="_blank"
          rel="noreferrer"
        >
          info@stellar-shop.io
        </a>
      ),
    },
    {
      key: 'address',
      content: <span>0-800-42-STELLAR</span>,
    },
    {
      key: 'social',
      content: <FooterSocial />,
    },
  ],
]

export function Footer(): React.ReactElement {
  return (
    <div css={styles.container}>
      <Logo width="100%" />
      <div css={styles.wrapper}>
        {FOOTER_ITEMS.map((items) => (
          <div css={styles.group} key={items[0].key}>
            {items.map((item) => {
              if (!item.to) return item.content
              return (
                <Link key={item.key} to={item.to} css={styles.link}>
                  {item.content}
                </Link>
              )
            })}
          </div>
        ))}
      </div>
      <div css={styles.rights}>
        <p>Powered by WordPress</p>
        <p>© All rights reserved, Modern Tribe</p>
      </div>
    </div>
  )
}
