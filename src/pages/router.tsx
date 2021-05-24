import { BrowserRouter, Switch, Route } from "react-router-dom";

import {CartPage, CategoryPage, HomePage, ProductPage} from ".";

function Header() {
  return (
    <div>
      <p style={{ backgroundColor: "blue", width: "100%", height: 80, color: 'white', fontSize: 32, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Header</p>
    </div>
  );
}

export function Router () {
  return (
    <BrowserRouter>
      <div>
        <Header></Header>
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