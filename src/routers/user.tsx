import * as React from 'react'

import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { NoMatch404, Submenu } from '@components'
import {
  AddAddressPage,
  AddressesPage,
  AddressPage,
  OrderPage,
  OrdersPage,
  ProfilePage,
  WishListPage,
  WishListsPage,
} from '@pages'

type SubmenuLink = {
  to: string
  labelKey: string
  labelDefault: string
}

export const submenuLinks: SubmenuLink[] = [
  {
    to: '/user/profile',
    labelKey: 'submenu.profile',
    labelDefault: 'Account profile',
  },
  {
    to: '/user/orders',
    labelKey: 'submenu.orders',
    labelDefault: 'Order history',
  },
  {
    to: '/user/addresses',
    labelKey: 'submenu.addresses',
    labelDefault: 'My addresses',
  },
  {
    to: '/user/wishlists',
    labelKey: 'submenu.wishlists',
    labelDefault: 'My wish lists',
  },
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
  if (error || !customer) {
    return <Navigate to={`/login?forward_url=${location.pathname}`} />
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
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:slug" element={<OrderPage />} />
        <Route path="/addresses" element={<AddressesPage />} />
        <Route path="/addresses/new" element={<AddAddressPage />} />
        <Route path="/addresses/:slug" element={<AddressPage />} />
        <Route path="/wishlists" element={<WishListsPage />} />
        <Route path="/wishlists/:slug" element={<WishListPage />} />
        <Route path="*" element={<NoMatch404 />} />
        <Route path="/" element={<Navigate to="/user/profile" />} />
      </Routes>
    </>
  )
}
