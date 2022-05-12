import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

import { NoMatch404 } from '@components'
import {
  AllCategories,
  CartPage,
  CategoryPage,
  HomePage,
  LoginPage,
  ProductPage,
  SearchPage,
  SignupPage,
  Sitemap,
} from '@pages'

import { UserRouter } from './user'

export function RootRoutes(): React.ReactElement {
  const { t } = useTranslation()

  return (
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
      <Route path="/help" element={<h1>{t('page_titles.help', 'Help')}</h1>} />
      <Route
        path="/contact-us"
        element={<h1>{t('page_titles.contact_us', 'Contact Us')}</h1>}
      />
      <Route
        path="/legal/shipping"
        element={<h1>{t('page_titles.shipping', 'Shipping')}</h1>}
      />
      <Route
        path="/legal/return"
        element={<h1>{t('page_titles.return', 'Return')}</h1>}
      />
      <Route
        path="/legal/guarantee"
        element={<h1>{t('page_titles.guarantee', 'Guarantee')}</h1>}
      />
      <Route
        path="/legal/privacy-policy"
        element={<h1>{t('page_titles.privacy_policy', 'Privacy Policy')}</h1>}
      />
      <Route path="/legal" element={<Navigate to="/legal/shipping" />} />
      <Route path="/sitemap" element={<Sitemap />} />
      <Route path="/user/*" element={<UserRouter />} />
      <Route path="*" element={<NoMatch404 />} />
    </Routes>
  )
}
