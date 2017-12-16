import styled from 'react-emotion'
import { Field } from 'redux-form'
import { fontSizes, colors } from '../styles'

const FormInput = styled(Field)`
  appearance: none;
  resize: none;
  display: block;
  width: 100%;
  background: transparent;
  padding: 8px 0;
  font-size: ${fontSizes.medium};
  border-style: none;
  border-bottom: 2px solid ${colors.grey};
  outline: none;
  margin-bottom: 20px;
  &:focus {
    border-color: ${colors.theme};
  }
`

export default FormInput
