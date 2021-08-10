import * as React from 'react'

import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'
import { css, Global, ThemeProvider } from '@emotion/react'
import emotionReset from 'emotion-reset'
import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import { CommerceComponentsProvider, theme } from 'unsafe-bc-react-components'

import './i18n'

import { RootRouter } from './routers'

import 'react-toastify/dist/ReactToastify.min.css'

export function App(): React.ReactElement {
  const { t } = useTranslation()

  return (
    <CommerceProvider
      locale="en-US"
      base={process.env.REACT_APP_API_ENDPOINT}
      credentials="include"
    >
      <ThemeProvider theme={theme}>
        <CommerceComponentsProvider t={t}>
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
              .Toastify__toast-container {
                ${theme?.typography?.body as any}
              }
              .Toastify__toast--success {
                background-color: ${theme?.colors?.['neutral-55'] as any};
              }
              .Toastify__toast--error {
                background-color: ${theme?.colors?.danger as any};
              }
            `}
          />
          <RootRouter />
          <ToastContainer />
        </CommerceComponentsProvider>
      </ThemeProvider>
    </CommerceProvider>
  )
}
