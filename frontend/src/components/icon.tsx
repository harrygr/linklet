import styled from 'react-emotion'
import { fontSizes } from '../styles'

interface Props {
  size?: string
}

export const Icon = styled<Props, 'svg'>('svg')`
  display: inline-block;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  ${props => {
    const size = props.size || fontSizes.medium
    return `
    width: ${size};
    height: ${size};
    `
  }};
`
export default Icon
