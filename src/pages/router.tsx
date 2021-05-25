import * as React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { CartPage, CategoryPage, HomePage, ProductPage } from '.'

function Header(): React.ReactElement {
  return (
    <div>
      <p
        style={{
          backgroundColor: 'blue',
          width: '100%',
          height: 80,
          color: 'white',
          fontSize: 32,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Header
      </p>
    </div>
  )
}

export function Router(): React.ReactElement {
  return (
    <BrowserRouter>
      <div>
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
        </Switch>
      </div>
    </BrowserRouter>
  )
}
