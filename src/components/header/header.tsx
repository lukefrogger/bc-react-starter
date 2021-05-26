import * as React from 'react'

import styled from '@emotion/styled'
import { Button } from 'reakit/Button'

import { Logo } from './logo'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  align-items: center;
`
const Icon = styled(Button)`
  cursor: pointer;
  border: none;
  padding: 8px;
  background-color: transparent;
  display: flex;
  position: relative;
  :first-child {
    margin-left: -8px;
    margin-right: 8px;
  }
  :last-child {
    margin-right: -8px;
    margin-left: 8px;
  }
`
const Badge = styled.span`
  position: absolute;
  right: 4px;
  top: 4px;
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #5400dc; // TODO: primary-50
  color: white; // TODO: neutral 0
  font-family: 'Red Hat Text';
  font-size: 12px;
  font-weight: 700;
  border-radius: 100%;
`
export function Header(): React.ReactElement {
  return (
    <Container>
      <Icon>
        <svg width={24} height={20} viewBox="0 0 24 20" fill="none">
          <path
            d="M1 19h22M1 1h22M1 10h22"
            stroke="#191919"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </Icon>
      <Logo />
      <Icon>
        <Badge>1</Badge>
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
      </Icon>
    </Container>
  )
}
