import { css } from '@emotion/react'

export const Modal = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  min-height: 40vh;
  max-width: 95vw;
  width: 100%;
  padding: 64px 16px;
  z-index: 10;
  max-height: 90vh;
  overflow-y: auto;

  @media (min-width: 1200px) {
    max-width: 1128px;
  }
`

export const Backdrop = css`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9;
  top: 0;
  left: 0;
`

export const Close = css`
  border: none;
  background: none;
  position: absolute;
  right: 20px;
  top: 25px;
  cursor: pointer;
`
