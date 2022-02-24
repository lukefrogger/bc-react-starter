import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

export function LegalRouter(): React.ReactElement {
  const { t } = useTranslation()
  return (
    <Routes>
      <Route
        path="/legal/shipping"
        element={<h1>{t('page_titles.shipping', 'Shipping')}</h1>}
      />
      <Route
        path="/legal/return"
        element={<h1>{t('page_titles.return', 'Return')}</h1>}
      />
      <Route
        path="/legal/guarantee"
        element={<h1>{t('page_titles.guarantee', 'Guarantee')}</h1>}
      />
      <Route
        path="/legal/privacy-policy"
        element={<h1>{t('page_titles.privacy_policy', 'Privacy Policy')}</h1>}
      />

      <Navigate to="/legal/shipping" />
    </Routes>
  )
}
