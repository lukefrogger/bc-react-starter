import React from 'react'

import { I18nextProvider } from 'react-i18next'

import i18n from '../i18n'

type Props = {
  children: JSX.Element
}

export function WithTranslation({ children }: Props): React.ReactElement {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
