import * as React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Banner } from 'unsafe-bc-react-components'

import { Footer, Header } from '@components'
import { Modal } from '@components/modal'
import { useQuickView } from '@hooks/use-quick-view'
import { useBanners } from '@hooks/useBanners'
import {
  CartPage,
  CategoryPage,
  HomePage,
  LoginPage,
  ProductPage,
  SignupPage,
  WishListPage,
} from '@pages'

import { LegalRouter } from './legal'
import { UserRouter } from './user'

export function RootRouter(): React.ReactElement {
  const { banner, onBannerClose } = useBanners()
  const quickView = useQuickView()

  return (
    <BrowserRouter>
      <div>
        {banner && <Banner onClose={onBannerClose}>{banner?.content}</Banner>}
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage onQuickViewClick={quickView.onShow} />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <Route exact path="/category/:categories">
            <CategoryPage onQuickViewClick={quickView.onShow} />
          </Route>
          <Route exact path="/category/:categories/:subCategories">
            <CategoryPage onQuickViewClick={quickView.onShow} />
          </Route>
          <Route
            exact
            path="/category/:categories/:subCategories/:subSubCategories"
          >
            <CategoryPage onQuickViewClick={quickView.onShow} />
          </Route>
          <Route path="/product/:slug">
            {({ match }) => match && <ProductPage slug={match?.params.slug} />}
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
          <Route exact path="/user/wishlists/:slug">
            <WishListPage />
          </Route>
          <Route path="/user">
            <UserRouter />
          </Route>
        </Switch>
        <Footer />
        <Modal {...quickView.modal}>
          {quickView?.slug && <ProductPage slug={quickView.slug} isLimited />}
        </Modal>
      </div>
    </BrowserRouter>
  )
}
