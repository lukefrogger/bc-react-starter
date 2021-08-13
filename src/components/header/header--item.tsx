import * as React from 'react'

import { Link, LinkProps } from 'react-router-dom'
import {
  Disclosure,
  DisclosureContent,
  useDisclosureState,
} from 'reakit/Disclosure'
import { Popover, PopoverDisclosure, usePopoverState } from 'reakit/Popover'

import * as Icons from './icons'
import * as styles from './styles'

function getArrowOrientation(
  visible: boolean,
  opened: Icons.ArrowOrientation,
  closed: Icons.ArrowOrientation
): Icons.ArrowOrientation {
  if (visible) return opened
  return closed
}

type Props<S = unknown> = Omit<LinkProps<S>, 'to'> &
  React.RefAttributes<HTMLAnchorElement> & {
    category: {
      name: string
      path: string
      children?: Props['category'][]
      entityId: number
    }
    behaviour?: 'disclosure' | 'popover'
    nested?: boolean
  }

export function HeaderItem(props: Props): React.ReactElement | null {
  const { category, behaviour, nested = false, ...rest } = props
  const popover = usePopoverState({
    placement: nested ? 'right-start' : 'bottom',
    gutter: nested ? 0 : 12,
  })
  const disclosure = useDisclosureState()

  if (category.children && category.children.length > 0) {
    if (behaviour === 'disclosure') {
      return (
        <>
          <Disclosure
            {...disclosure}
            css={nested ? styles.subcategory : styles.category}
          >
            {category.name}
            <Icons.Arrow
              orientation={getArrowOrientation(
                disclosure.visible,
                'up',
                'down'
              )}
            />
          </Disclosure>
          <DisclosureContent
            {...disclosure}
            css={nested ? styles.disclosureNested : styles.disclosure}
          >
            {category.children.map((subcategory) => (
              <HeaderItem
                key={subcategory.entityId}
                category={subcategory}
                css={styles.subcategory}
                behaviour={nested ? undefined : 'disclosure'} // Only supports 2 levels of subcategories
                nested
                {...rest}
              />
            ))}
            <HeaderItem
              category={{
                name: `All ${category.name}`,
                path: category.path,
                entityId: category.entityId,
              }}
              css={styles.subcategory}
              {...rest}
            />
          </DisclosureContent>
        </>
      )
    }
    if (behaviour === 'popover') {
      return (
        <>
          <PopoverDisclosure
            {...popover}
            css={nested ? styles.subcategory : styles.category}
          >
            {category.name}
            <Icons.Arrow
              orientation={getArrowOrientation(
                popover.visible,
                nested ? 'left' : 'up',
                nested ? 'right' : 'down'
              )}
            />
          </PopoverDisclosure>
          <Popover
            {...popover}
            aria-label="Welcome"
            css={nested ? styles.popoverNested : styles.popover}
          >
            {category.children.map((subcategory) => (
              <HeaderItem
                key={subcategory.entityId}
                category={subcategory}
                css={styles.subcategory}
                onClick={popover.hide}
                behaviour={nested ? undefined : 'popover'} // Only supports 2 levels of subcategories
                nested
                {...rest}
              />
            ))}
            <HeaderItem
              category={{
                name: `All ${category.name}`,
                path: category.path,
                entityId: category.entityId,
              }}
              css={styles.subcategory}
              {...rest}
            />
          </Popover>
        </>
      )
    }
  }

  return (
    <Link css={styles.category} to={`/category${category.path}`} {...rest}>
      {category.name}
    </Link>
  )
}
