import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Redirect, Route, Switch } from 'react-router-dom'

export function LegalRouter(): React.ReactElement {
  const { t } = useTranslation()
  return (
    <Switch>
      <Route exact path="/legal/shipping">
        <h1>{t('page_titles.shipping', 'Shipping')}</h1>
      </Route>
      <Route exact path="/legal/return">
        <h1>{t('page_titles.return', 'Return')}</h1>
      </Route>
      <Route exact path="/legal/guarantee">
        <h1>{t('page_titles.guarantee', 'Guarantee')}</h1>
      </Route>
      <Route exact path="/legal/privacy-policy">
        <h1>{t('page_titles.privacy_policy', 'Privacy Policy')}</h1>
      </Route>

      <Redirect from="/legal" to="/legal/shipping" />
    </Switch>
  )
}
