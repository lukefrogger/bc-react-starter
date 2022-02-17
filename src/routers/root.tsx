/* eslint react/no-unused-prop-types: 0 */
import * as React from 'react'

import { css } from '@emotion/react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Footer, Header, NoMatch404, Notices } from '@components'
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
        <Notices />
        <Header />
        <Routes>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/categories/all">
            <AllCategories />
          </Route>
          <Route path="/category/:categories">
            <CategoryPage />
          </Route>
          <Route path="/category/:categories/:subCategories">
            <CategoryPage />
          </Route>
          <Route path="/category/:categories/:subCategories/:subSubCategories">
            <CategoryPage />
          </Route>
          <Route path="/product/:slug">
            {({ match }: { match: any }) =>
              match && <ProductPage slug={match?.params.slug} />
            }
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          {
            // TODO: Create this pages
          }
          <Route path="/about-us">
            <h1>{t('page_titles.about_us', 'About us')}</h1>
          </Route>
          <Route path="/help">
            <h1>{t('page_titles.help', 'Help')}</h1>
          </Route>
          <Route path="/contact-us">
            <h1>{t('page_titles.contact_us', 'Contact Us')}</h1>
          </Route>

          <Route path="/legal">
            <LegalRouter />
          </Route>
          <Route path="/user/wishlists/:slug">
            <WishListPage />
          </Route>
          <Route path="/user">
            <UserRouter />
          </Route>
          <Route path="*">
            <NoMatch404 />
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
