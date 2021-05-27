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
  }

export function HeaderItem(props: Props): React.ReactElement {
  const { category, behaviour, ...rest } = props
  const popover = usePopoverState()
  const disclosure = useDisclosureState()

  if (category.categories) {
    if (behaviour === 'disclosure') {
      return (
        <>
          <Disclosure {...disclosure} css={styles.category}>
            {category.label}
            <Icons.ArrowDown />
          </Disclosure>
          <DisclosureContent {...disclosure} css={styles.disclosure}>
            {category.categories.map((subcategory) => (
              <HeaderItem
                category={subcategory}
                css={styles.subcategory}
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
          <PopoverDisclosure {...popover} css={styles.category}>
            {category.label}
            <Icons.ArrowDown />
          </PopoverDisclosure>
          <Popover {...popover} aria-label="Welcome" css={styles.popover}>
            {category.categories.map((subcategory) => (
              <HeaderItem
                category={subcategory}
                css={styles.subcategory}
                onClick={popover.hide}
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
