import styled from 'react-emotion'
import { spacing } from '../styles'

export const CardSection = styled('div')`
  padding: ${spacing.s2} ${spacing.s2} 0 ${spacing.s2};
  &:last-child {
    padding-bottom: ${spacing.s2};
  }
`
export default CardSection
