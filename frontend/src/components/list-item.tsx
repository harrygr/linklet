import styled from 'react-emotion'
import { spacing } from '../styles'

export const ListItem = styled('li')`
  padding: ${spacing.cat};
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom-style: none;
  }
`

export default ListItem
