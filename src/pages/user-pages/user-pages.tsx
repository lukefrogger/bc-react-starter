import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'

import { Submenu } from '@components'
import {
  AddressesPage,
  AddressPage,
  OrderPage,
  OrdersPage,
  ProfilePage,
  WishListPage,
  WishListsPage,
} from '@pages'

const submenuLinks = [
  { to: '/user/profile', labelKey: 'submenu.profile' },
  { to: '/user/orders', labelKey: 'submenu.orders' },
  { to: '/user/addresses', labelKey: 'submenu.addresses' },
  { to: '/user/wishlists', labelKey: 'submenu.wishlists' },
]

export function UserPages(): React.ReactElement {
  const activeLink = React.useRef(null)
  const location = useLocation()
  const { t } = useTranslation()

  // Menu is horizontally scrollable on smaller screens
  // This makes sure the active link is always visible
  React.useEffect(() => {
    if (!activeLink.current) return
    ;(activeLink.current as any)?.scrollIntoView?.()
  }, [])

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
        <Route exact path="/user/addresses/:slug">
          <AddressPage />
        </Route>
        <Route exact path="/user/wishlists">
          <WishListsPage />
        </Route>
        <Route exact path="/user/wishlists/:slug">
          <WishListPage />
        </Route>
        <Redirect from="/user" to="/user/profile" />
      </Switch>
    </>
  )
}
