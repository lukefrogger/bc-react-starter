import * as React from "react";
import { Global, css, ThemeProvider } from '@emotion/react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { theme, Banner } from 'unsafe-bc-react-components';
import emotionReset from 'emotion-reset';
import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'


import Category from "../pages/category";
import Home from "../pages/home";
import KitchenSink from "../pages/kitchen-sink";
import Product from "../pages/product";
import Cart from "../pages/cart";
import { getDismissedBannerIds, setDismissedBannerId } from "../utils/local-storage";

const getActiveBanner = () => {
  // TODO: API request
  const banner = { id: 1, content: 'Free international shipping on $50+'};
  const dismissedBanners = getDismissedBannerIds();

  if (!dismissedBanners.includes(banner.id)) {
    return banner
  }
}

export default function App() {  
  const activeBanner = getActiveBanner();
  const [isBannerVisible, setBannerVisible] = React.useState(!!activeBanner)

  const handleBannerClose = () => {
    if (!activeBanner) return;
    setBannerVisible(false);
    setDismissedBannerId(activeBanner.id);
  };

  return (
    <CommerceProvider locale={'en-US'}>
      <ThemeProvider theme={theme}>
        <Global
          styles={css`
            @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;900&family=Red+Hat+Text:wght@400;700&display=swap');
            ${emotionReset}
            *, *::after, *::before {
              box-sizing: border-box;
              -moz-osx-font-smoothing: grayscale;
              -webkit-font-smoothing: antialiased;
            }
            body {
              ${theme?.typography?.body as any}
            }
          `}
        />
        <Router>
          <div style={{ marginTop: isBannerVisible ? 48 : 0 }}>
            {isBannerVisible && <Banner onClose={handleBannerClose}>Free international shipping on $50+</Banner>}
            <Header />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/category/:slug">
                <Category />
              </Route>
              <Route path="/product/:slug">
                <Product />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/kitchen-sink">
                <KitchenSink />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </CommerceProvider>
  );
}

function Header() {
  return (
    <div>
      <p style={{ backgroundColor: "blue", width: "100%", height: 80, color: 'white', fontSize: 32, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Header</p>
    </div>
  );
}
