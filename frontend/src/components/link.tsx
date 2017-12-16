import styled, { css } from 'react-emotion'
import { Link } from 'react-router-dom'

const linkClass = css`
  text-decoration: none;
  color: inherit;
`

export const Anchor = styled('a')`
  ${linkClass};
`

export const RouterLink = styled(Link)`
  ${linkClass};
`
export default { Anchor, RouterLink }
