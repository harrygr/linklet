import styled, { css } from 'react-emotion'
import { colors, spacing, fontSizes } from '../styles'

export const buttonClass = css`
  appearance: none;
  color: #fff;
  background-color: ${colors.theme};
  border-color: ${colors.theme};
  border-radius: 3px;
  border-style: solid;
  cursor: pointer;
  font-size: ${fontSizes.medium};
  letter-spacing: 0.04em;
  outline: none;
  padding: ${spacing.flea} ${spacing.cat};
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color ease 300ms, border-color ease 300ms;
  &:hover {
    background: ${colors.themeDark};
    border-color: ${colors.themeDark};
  }
  &:focus {
    background: ${colors.themeDarker};
    border-color: ${colors.themeDarker};
  }
`

export const Button = styled('button')`
  ${buttonClass};
`

export default Button
