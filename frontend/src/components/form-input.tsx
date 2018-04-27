import * as React from 'react'
import styled from 'react-emotion'
import { Validator, WrappedFieldProps } from 'redux-form'
import { fontSizes, colors, spacing } from '../styles'
import { Label, FormError } from '.'
import { ComponentType } from 'react'

export const StyledFormInput = styled('input')`
  appearance: none;
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${colors.grey5};
  display: block;
  font-size: ${fontSizes.medium};
  margin-top: ${spacing.flea};
  outline: none;
  padding: 8px 12px;
  resize: none;
  transition: border-color 0.3s ease;
  width: 100%;
  &:focus {
    border-color: ${colors.theme};
  }
  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

interface Props {
  id?: string
  type?: string
  label: string
  validate?: Validator | Validator[]
  placeholder?: string
  rows?: any
}

export const FormInput: ComponentType<WrappedFieldProps & Props> = ({
  input,
  meta,
  id = input.name,
  label,
  type = 'text',
  placeholder,
}) => {
  const isInvalid = meta.touched && meta.invalid
  const errorId = `${id}-error`
  const accessibilityAttrs = {
    'aria-invalid': isInvalid ? 'true' : undefined,
    'aria-describedby': isInvalid ? errorId : undefined,
  }

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <StyledFormInput
        {...input}
        id={id}
        type={type}
        {...accessibilityAttrs}
        placeholder={placeholder}
      />
      {isInvalid && <FormError id={errorId}>{meta.error}</FormError>}
    </div>
  )
}

export default FormInput
