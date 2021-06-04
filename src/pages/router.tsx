import * as React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Banner } from 'unsafe-bc-react-components'

import { Footer, Header } from '@components'
import { useBanners } from '@hooks/useBanners'
import {
  CartPage,
  CategoryPage,
  HomePage,
  ProductPage,
  UserPages,
} from '@pages'

export function Router(): React.ReactElement {
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
          <Route exact path="/category/:slug">
            <CategoryPage />
          </Route>
          <Route path="/product/:slug">
            <ProductPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>

          <Route path="/user">
            <UserPages />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
