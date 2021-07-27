import { useState } from 'react'

import { DialogStateReturn, useDialogState } from 'reakit/Dialog'

export type QuickViewShowFn = (slug: string) => void

type UseQuickView = {
  onShow: QuickViewShowFn
  slug?: string
  modal: DialogStateReturn
}

export const useQuickView = (): UseQuickView => {
  const modal = useDialogState()
  const [activeSlug, setActiveSlug] = useState<string>()

  const onShow = (slug: string): void => {
    setActiveSlug(slug.replaceAll('/', ''))
    modal.toggle()
  }

  return {
    onShow,
    modal,
    slug: activeSlug,
  }
}
