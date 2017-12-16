import styled from 'react-emotion'
import { Field } from 'redux-form'
import { fontSizes, colors, spacing } from '../styles'

export const FormInput = styled(Field)`
  appearance: none;
  resize: none;
  display: block;
  width: 100%;
  background: transparent;
  padding: 8px 0;
  font-size: ${fontSizes.medium};
  border-style: none;
  border-bottom: 2px solid ${colors.grey};
  transition: border-color 1s ease;
  outline: none;
  margin-bottom: ${spacing.s2};
  &:focus {
    border-color: ${colors.theme};
  }
`

export default FormInput
