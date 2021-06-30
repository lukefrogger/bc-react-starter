import * as React from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

export function LegalRouter(): React.ReactElement {
  return (
    <Switch>
      <Route exact path="/legal/shipping">
        <h1>Shipping</h1>
      </Route>
      <Route exact path="/legal/return">
        <h1>Return</h1>
      </Route>
      <Route exact path="/legal/guarantee">
        <h1>Guarantee</h1>
      </Route>
      <Route exact path="/legal/privacy-policy">
        <h1>Privacy Policy</h1>
      </Route>

      <Redirect from="/legal" to="/legal/shipping" />
    </Switch>
  )
}
