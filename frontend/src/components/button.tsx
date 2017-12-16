import styled from 'react-emotion'

export const Button = styled('button')`
  appearance: none;
  background: transparent;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  height: 36px;
  letter-spacing: 0.04em;
  line-height: 2.25rem;
  outline: none;
  padding: 0 16px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color ease 300ms;
  &:hover {
    background: rgba(153, 153, 153, 0.5);
  }
  &:focus {
    background: rgba(153, 153, 153, 0.7);
  }
`

export default Button
