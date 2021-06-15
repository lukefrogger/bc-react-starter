import * as React from 'react'

import * as styles from './styles'

export type FooterSocialProps = {
  instagram?: string
  facebook?: string
  youtube?: string
}

export function FooterSocial(props: FooterSocialProps): React.ReactElement {
  const { instagram, facebook, youtube } = props
  return (
    <div css={styles.social}>
      {instagram && (
        <a href={instagram} target="_blank" rel="noreferrer">
          <svg width={31} height={31} viewBox="0 0 31 31" fill="none">
            <path
              d="M15 2.7c4 0 4.479.015 6.061.087a6.426 6.426 0 014.51 1.639 6.426 6.426 0 011.639 4.51c.072 1.585.09 2.064.09 6.064s-.015 4.479-.087 6.061a6.426 6.426 0 01-1.639 4.51 6.425 6.425 0 01-4.51 1.639c-1.582.072-2.056.087-6.061.087s-4.479-.015-6.061-.087a6.426 6.426 0 01-4.51-1.639 6.425 6.425 0 01-1.639-4.51C2.718 19.479 2.7 19.005 2.7 15s.015-4.479.087-6.061a6.426 6.426 0 011.639-4.51A6.426 6.426 0 018.939 2.79C10.521 2.718 11 2.7 15 2.7zM15 0c-4.073 0-4.584.017-6.185.09a8.974 8.974 0 00-6.3 2.427 8.971 8.971 0 00-2.427 6.3C.017 10.416 0 10.927 0 15s.017 4.584.09 6.185a8.974 8.974 0 002.427 6.3 8.971 8.971 0 006.3 2.427c1.6.073 2.112.09 6.185.09 4.073 0 4.584-.017 6.185-.09a8.974 8.974 0 006.3-2.427 8.971 8.971 0 002.427-6.3c.073-1.6.09-2.112.09-6.185 0-4.073-.017-4.584-.09-6.185a8.974 8.974 0 00-2.427-6.3 8.971 8.971 0 00-6.3-2.427C19.584.017 19.073 0 15 0z"
              fill="#333"
            />
            <path
              d="M15 7.3a7.7 7.7 0 100 15.4 7.7 7.7 0 000-15.4zM15 20a5 5 0 110-10 5 5 0 010 10zM23.007 8.793a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z"
              fill="#333"
            />
          </svg>
        </a>
      )}
      {facebook && (
        <a href={facebook} target="_blank" rel="noreferrer">
          <svg width={16} height={30} viewBox="0 0 16 30" fill="none">
            <path
              d="M4.462 30V17H0v-6h4.462V6.81c0-4.564 2.89-6.81 6.961-6.81 1.95 0 3.627.145 4.115.21v4.77l-2.824.001C10.5 4.981 10 6.034 10 7.578V11h6l-2 6h-4v13H4.462z"
              fill="#333"
            />
          </svg>
        </a>
      )}
      {youtube && (
        <a href={youtube} target="_blank" rel="noreferrer">
          <svg width={32} height={24} viewBox="0 0 32 24" fill="none">
            <path
              d="M31.7 5.6s-.3-2.2-1.3-3.2c-1.2-1.3-2.6-1.3-3.2-1.4C22.7.7 16 .7 16 .7S9.3.7 4.8 1c-.6.1-2 .1-3.2 1.4C.6 3.4.3 5.6.3 5.6S0 8.2 0 10.8v2.4c0 2.6.3 5.2.3 5.2s.3 2.2 1.3 3.2c1.2 1.3 2.8 1.2 3.5 1.4 2.6.2 10.9.3 10.9.3s6.7 0 11.2-.3c.6-.1 2-.1 3.2-1.4 1-1 1.3-3.2 1.3-3.2s.3-2.6.3-5.2v-2.4c0-2.6-.3-5.2-.3-5.2zm-19 10.6v-9l8.6 4.5-8.6 4.5z"
              fill="#333"
            />
          </svg>
        </a>
      )}
    </div>
  )
}
