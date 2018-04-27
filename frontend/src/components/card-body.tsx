import styled from 'react-emotion'
import { spacing } from '../styles'

export const CardSection = styled('div')`
  padding: ${spacing.cat} ${spacing.cat} 0 ${spacing.cat};
  &:last-child {
    padding-bottom: ${spacing.cat};
  }
`
export default CardSection
