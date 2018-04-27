import { spacing } from '../styles'
import styled from 'react-emotion'

interface Props {
  space?: keyof typeof spacing
}

export const Vspace = styled<Props, 'div'>('div')`
  & > * + * {
    margin-top: ${props => spacing[props.space || 'cat']};
  }
`

export default Vspace
