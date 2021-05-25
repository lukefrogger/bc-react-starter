import * as React from 'react'

export function Header(): React.ReactElement {
  return (
    <div>
      <p
        style={{
          backgroundColor: 'blue',
          width: '100%',
          height: 80,
          color: 'white',
          fontSize: 32,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Header
      </p>
    </div>
  )
}
