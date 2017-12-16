import Card from './card'
import styled from 'react-emotion'
import { spacing } from '../styles'

export const PaddedCard = styled(Card)`
  padding: ${spacing.s2};
`
export default PaddedCard
