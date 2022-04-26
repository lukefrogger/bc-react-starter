import * as React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { WithTranslation } from '@utils/with-translation'

import { App } from './app'

test('homepage has links', async () => {
  act(() => {
    render(
      <WithTranslation>
        <App />
      </WithTranslation>
    )
  })

  await waitFor(() => {
    const links = screen.getAllByRole('link')

    expect(links.length > 0).toBe(true)
  })
})
