import * as React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Banner } from 'unsafe-bc-react-components'

import { Footer, Header } from '@components'
import { useBanners } from '@hooks/useBanners'
import { CartPage, CategoryPage, HomePage, ProductPage } from '@pages'

import { LegalRouter } from './legal'
import { UserRouter } from './user'

export function RootRouter(): React.ReactElement {
  const { banner, onBannerClose } = useBanners()

  return (
    <BrowserRouter>
      <div>
        {banner && <Banner onClose={onBannerClose}>{banner?.content}</Banner>}
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/category/:categories">
            <CategoryPage />
          </Route>
          <Route exact path="/category/:categories/:subCategories">
            <CategoryPage />
          </Route>
          <Route
            exact
            path="/category/:categories/:subCategories/:subSubCategories"
          >
            <CategoryPage />
          </Route>
          <Route path="/product/:slug">
            <ProductPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          {
            // TODO: Create this pages
          }
          <Route path="/about-us">
            <h1>About us</h1>
          </Route>
          <Route path="/help">
            <h1>Help</h1>
          </Route>
          <Route path="/contact-us">
            <h1>Contact Us</h1>
          </Route>

          <Route path="/legal">
            <LegalRouter />
          </Route>
          <Route path="/user">
            <UserRouter />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
