import { ReactElement, useEffect } from 'react'

export type PageWithTitleProps = {
  title?: string
  children: ReactElement
}

export function PageWithTitle(props: PageWithTitleProps): ReactElement {
  const { title, children } = props

  useEffect(() => {
    document.title = title || ''
  }, [title])

  return children
}
