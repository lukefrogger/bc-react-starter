import * as React from 'react'

import { Link, LinkProps } from 'react-router-dom'
import {
  Disclosure,
  DisclosureContent,
  useDisclosureState,
} from 'reakit/Disclosure'
import { Popover, PopoverDisclosure, usePopoverState } from 'reakit/Popover'

import { Category } from '@hooks'

import * as Icons from './icons'
import * as styles from './styles'

type Props<S = unknown> = Omit<LinkProps<S>, 'to'> &
  React.RefAttributes<HTMLAnchorElement> & {
    category: Category
    behaviour?: 'disclosure' | 'popover'
    nested?: boolean
  }

export function HeaderItem(props: Props): React.ReactElement {
  const { category, behaviour, nested = false, ...rest } = props
  const popover = usePopoverState({
    placement: nested ? 'right-start' : 'bottom',
    gutter: nested ? 0 : 12,
  })
  const disclosure = useDisclosureState()

  if (category.categories) {
    if (behaviour === 'disclosure') {
      return (
        <>
          <Disclosure
            {...disclosure}
            css={nested ? styles.subcategory : styles.category}
          >
            {category.label}
            <Icons.ArrowDown />
          </Disclosure>
          <DisclosureContent
            {...disclosure}
            css={nested ? styles.disclosureNested : styles.disclosure}
          >
            {category.categories.map((subcategory) => (
              <HeaderItem
                category={subcategory}
                css={styles.subcategory}
                behaviour={nested ? undefined : 'disclosure'} // Only supports 2 levels of subcategories
                nested
                {...rest}
              />
            ))}
            <HeaderItem
              category={{
                label: `All ${category.label}`,
                slug: category.slug,
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
            {category.label}
            <Icons.ArrowDown />
          </PopoverDisclosure>
          <Popover
            {...popover}
            aria-label="Welcome"
            css={nested ? styles.popoverNested : styles.popover}
          >
            {category.categories.map((subcategory) => (
              <HeaderItem
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
                label: `All ${category.label}`,
                slug: category.slug,
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
    <Link css={styles.category} to={`category/${category.slug}`} {...props}>
      {category.label}
    </Link>
  )
}
