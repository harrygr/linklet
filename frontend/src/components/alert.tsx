import * as React from 'react'

import styled from 'react-emotion'
import { AlertLevel } from '../store/ui/reducer'

interface Props {
  message: string
  level: AlertLevel
}

export default function Alert({ message, level }: Props) {
  if (level === 'none') {
    return <div />
  }

  const Container = styled('div')`
    background: ${getBackground(level)};
    color: #fff;
    padding: 15px;
  `

  return <Container>{message}</Container>
}

function getBackground(level: AlertLevel): string {
  const bgs = { danger: 'red', warning: 'orange', success: 'green' }
  return bgs[level] || 'transparent'
}
