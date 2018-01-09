import styled, { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import { buttonClass } from './button'

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

export const LinkButton = styled(Link)`
  ${buttonClass};
`
export default { Anchor, RouterLink }
