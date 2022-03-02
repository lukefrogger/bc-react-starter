import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'

import { NoMatch404 } from '@components'

export function LegalRouter(): React.ReactElement {
  const { t } = useTranslation()
  return (
    <Routes>
      <Route
        path="/shipping"
        element={<h1>{t('page_titles.shipping', 'Shipping')}</h1>}
      />
      <Route
        path="/return"
        element={<h1>{t('page_titles.return', 'Return')}</h1>}
      />
      <Route
        path="/guarantee"
        element={<h1>{t('page_titles.guarantee', 'Guarantee')}</h1>}
      />
      <Route
        path="/privacy-policy"
        element={<h1>{t('page_titles.privacy_policy', 'Privacy Policy')}</h1>}
      />

      <Route path="/" element={<Navigate to="/legal/shipping" />} />
      <Route path="*" element={<NoMatch404 />} />
    </Routes>
  )
}
