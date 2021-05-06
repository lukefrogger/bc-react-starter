import React from "react";
import { Global, css, ThemeProvider } from '@emotion/react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { theme } from 'unsafe-bc-react-components';
import emotionReset from 'emotion-reset';

import Home from "../pages/home";

export default function App() {
  return (
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
        `}
      />
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>

  );
}

function Cart() {
  return (
    <div>
      <h2>Cart</h2>
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Login</h2>
    </div>
  );
}
