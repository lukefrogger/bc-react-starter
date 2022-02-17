import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

export function LegalRouter(): React.ReactElement {
  const { t } = useTranslation()
  return (
    <Routes>
      <Route path="/legal/shipping">
        <h1>{t('page_titles.shipping', 'Shipping')}</h1>
      </Route>
      <Route path="/legal/return">
        <h1>{t('page_titles.return', 'Return')}</h1>
      </Route>
      <Route path="/legal/guarantee">
        <h1>{t('page_titles.guarantee', 'Guarantee')}</h1>
      </Route>
      <Route path="/legal/privacy-policy">
        <h1>{t('page_titles.privacy_policy', 'Privacy Policy')}</h1>
      </Route>

      <Navigate to="/legal/shipping" />
    </Routes>
  )
}
