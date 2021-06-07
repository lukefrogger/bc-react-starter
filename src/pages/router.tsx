import * as React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Banner } from 'unsafe-bc-react-components'

import { Footer, Header } from '@components'
import { useBanners } from '@hooks/useBanners'
import {
  AddressesPage,
  AddressPage,
  CartPage,
  CategoryPage,
  HomePage,
  OrderPage,
  OrdersPage,
  ProductPage,
  ProfilePage,
  WishListPage,
  WishListsPage,
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
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
          <Route exact path="/order/:slug">
            <OrderPage />
          </Route>
          <Route path="/addresses">
            <AddressesPage />
          </Route>
          <Route exact path="/address/:slug">
            <AddressPage />
          </Route>
          <Route path="/wishlists">
            <WishListsPage />
          </Route>
          <Route exact path="/wishlist/:slug">
            <WishListPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
