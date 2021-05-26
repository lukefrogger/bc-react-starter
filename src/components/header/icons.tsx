import * as React from 'react'

export function Hamburger(): React.ReactElement {
  return (
    <svg width={24} height={20} viewBox="0 0 24 20" fill="none">
      <path
        d="M1 19h22M1 1h22M1 10h22"
        stroke="#191919"
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function Close(): React.ReactElement {
  return (
    <svg width={24} height={20} viewBox="0 0 20 20" fill="none">
      <path
        d="M18 2L2 18M18 18L2 2"
        stroke="#191919"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="square"
      />
    </svg>
  )
}

export function Bag(): React.ReactElement {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <path
        d="M21 23H3V6h18v17z"
        stroke="#191919"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="square"
      />
      <path
        d="M8 9V5c0-2.2 1.8-4 4-4s4 1.8 4 4v4"
        stroke="#191919"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="square"
      />
    </svg>
  )
}
export function User(): React.ReactElement {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <path
        d="M8.677 14.997l-5.706 3.421A2 2 0 002 20.132V23h20v-2.868a2 2 0 00-.971-1.715l-5.706-3.42"
        stroke="#191919"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path
        d="M12 16a6 6 0 01-6-6V7a6 6 0 1112 0v3a6 6 0 01-6 6z"
        stroke="#191919"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="square"
      />
    </svg>
  )
}
