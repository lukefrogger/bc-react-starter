/* eslint react/no-unused-prop-types: 0 */
import * as React from 'react'

import { css } from '@emotion/react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Footer, Header, NoMatch404, Notices } from '@components'
import { SkipContentButton } from '@components/skip-content-button'
import {
  AllCategories,
  CartPage,
  CategoryPage,
  HomePage,
  LoginPage,
  ProductPage,
  SearchPage,
  SignupPage,
  WishListPage,
} from '@pages'

import { LegalRouter } from './legal'
import { ScrollToTop } from './scroll-top'
import { UserRouter } from './user'

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/categories/all" element={<AllCategories />} />
          <Route path="/category/:categories" element={<CategoryPage />} />
          <Route
            path="/category/:categories/:subCategories"
            element={<CategoryPage />}
          />
          <Route
            path="/category/:categories/:subCategories/:subSubCategories"
            element={<CategoryPage />}
          />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          {
            // TODO: Create this pages
          }
          <Route
            path="/about-us"
            element={<h1>{t('page_titles.about_us', 'About us')}</h1>}
          />
          <Route
            path="/help"
            element={<h1>{t('page_titles.help', 'Help')}</h1>}
          />
          <Route
            path="/contact-us"
            element={<h1>{t('page_titles.contact_us', 'Contact Us')}</h1>}
          />

          <Route path="/legal/*" element={<LegalRouter />} />
          <Route path="/user/wishlists/:slug" element={<WishListPage />} />
          <Route path="/user/*" element={<UserRouter />} />
          <Route path="*" element={<NoMatch404 />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
