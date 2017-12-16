import styled from 'react-emotion'
import { spacing } from '../styles'

const ListItem = styled('li')`
  padding: ${spacing.s2};
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom-style: none;
  }
`

export default ListItem
