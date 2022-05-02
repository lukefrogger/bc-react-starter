/* eslint react/no-unused-prop-types: 0 */
import * as React from 'react'

import { css } from '@emotion/react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import { Footer, Header, Notices } from '@components'
import { SkipContentButton } from '@components/skip-content-button'

import { RootRoutes } from './routes'
import { ScrollToTop } from './scroll-top'

export function RootRouter(): React.ReactElement {
  const { t } = useTranslation()

  return (
    <BrowserRouter>
      <Helmet>
        <title>{t('store.name', 'Stellar Store')}</title>
      </Helmet>
      <ScrollToTop />
      <div
        css={css`
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        `}
      >
        <SkipContentButton />
        <Notices />
        <Header />
        <RootRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  )
}
