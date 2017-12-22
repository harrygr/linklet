import * as React from 'react'

import { css } from 'react-emotion'
import { AlertLevel } from '../store/ui/reducer'
import { transitionTime, colors } from '../styles'

interface Props {
  message: string
  level: AlertLevel
}

const baseAlertClass = css`
  padding: 15px;
  color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ${transitionTime}ms ease;
`

export function Alert({ message, level }: Props) {
  const alertClass = css`
    ${baseAlertClass};
    ${getContextCss(level)};
  `

  return <div className={alertClass}>{message}</div>
}

function getContextCss(level: AlertLevel) {
  switch (level) {
    case 'none': {
      return css`
        transform: translateY(100%);
        opacity: 0;
      `
    }
    case 'success': {
      return css`
        background: ${colors.green};
      `
    }
    case 'warning': {
      return css`
        background: ${colors.amber};
      `
    }
    case 'danger': {
      return css`
        background: ${colors.red};
      `
    }
  }
}

export default Alert
