import * as React from 'react'

import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { useTranslation } from 'react-i18next'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'

import { Submenu } from '@components'
import {
  AddAddressPage,
  AddressesPage,
  AddressPage,
  OrderPage,
  OrdersPage,
  ProfilePage,
  WishListsPage,
} from '@pages'

type SubmenuLink = {
  to: string
  labelKey: string
}

export const submenuLinks: SubmenuLink[] = [
  { to: '/user/profile', labelKey: 'submenu.profile' },
  { to: '/user/orders', labelKey: 'submenu.orders' },
  { to: '/user/addresses', labelKey: 'submenu.addresses' },
  { to: '/user/wishlists', labelKey: 'submenu.wishlists' },
]

export function UserRouter(): React.ReactElement {
  const activeLink = React.useRef(null)
  const location = useLocation()
  const { data: customer, error } = useCustomer()
  const { t } = useTranslation()

  // Menu is horizontally scrollable on smaller screens
  // This makes sure the active link is always visible
  React.useEffect(() => {
    if (!activeLink.current) return
    ;(activeLink.current as any)?.scrollIntoView?.()
  }, [])

  // User is unauthenticated
  if (error && !customer) {
    return <Redirect to={`/login?forward_url=${location.pathname}`} />
  }

  return (
    <>
      <Submenu>
        {submenuLinks.map((link) => {
          const isActive = location.pathname?.startsWith(link.to)

          return (
            <Submenu.Link
              key={link.to}
              to={link.to}
              isActive={isActive}
              {...(isActive && { ref: activeLink })}
            >
              {t(link.labelKey)}
            </Submenu.Link>
          )
        })}
      </Submenu>
      <Switch>
        <Route exact path="/user/profile">
          <ProfilePage />
        </Route>
        <Route exact path="/user/orders">
          <OrdersPage />
        </Route>
        <Route exact path="/user/orders/:slug">
          <OrderPage />
        </Route>
        <Route exact path="/user/addresses">
          <AddressesPage />
        </Route>
        <Route exact path="/user/addresses/new">
          <AddAddressPage />
        </Route>
        <Route exact path="/user/addresses/:slug">
          <AddressPage />
        </Route>
        <Route exact path="/user/wishlists">
          <WishListsPage />
        </Route>
        <Redirect from="/user" to="/user/profile" />
      </Switch>
    </>
  )
}
