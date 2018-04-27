import styled from 'react-emotion'
import { spacing, colors, fontSizes } from '../styles'

export const FormError = styled('p')`
  padding: 0;
  margin: ${spacing.flea} 0 0;
  color: ${colors.red};
  font-size: ${fontSizes.small};
`
