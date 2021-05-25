import * as React from 'react'

export function Footer(): React.ReactElement {
  return (
    <div>
      <p
        style={{
          backgroundColor: 'gainsboro',
          width: '100%',
          height: 80,
          color: 'white',
          fontSize: 32,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Footer
      </p>
    </div>
  )
}
