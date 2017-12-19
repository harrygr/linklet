import styled from 'react-emotion'
import { Field } from 'redux-form'
import { fontSizes, colors, spacing } from '../styles'

export const FormInput = styled(Field)`
  appearance: none;
  background: transparent;
  border-radius: 0;
  border-style: none;
  border-bottom: 2px solid ${colors.grey};
  display: block;
  font-size: ${fontSizes.medium};
  margin-bottom: ${spacing.s2};
  outline: none;
  padding: 8px 0;
  resize: none;
  transition: border-color 1s ease;
  width: 100%;
  &:focus {
    border-color: ${colors.theme};
  }
`

export default FormInput
