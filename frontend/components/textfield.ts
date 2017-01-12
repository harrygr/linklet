import html from 'choo/html'
import * as map from 'lodash/fp/map'

interface TextFieldProps {
  type?: string
  label?: string
  id?: string
  errors?: Array<string>
  value?: string
  oninput?: Function
  placeholder?: string
}

const renderError = (error: string): HTMLElement => {
  return html`<span class="help is-danger">${error}</span>`
}

type ArrayOfStringsToHtml = (errors: Array<string>) => Array<HTMLElement>
const errorMessages: ArrayOfStringsToHtml = map(renderError)

export default ({
  type = 'text',
  label = '',
  id = '',
  errors = [],
  value = '',
  oninput = () => {},
  placeholder = ''
}: TextFieldProps) => {
  return html`
  <p class="control">
    <label class="label" for=${id}>${label}</label>
    <input
      class="input ${errors.length ? 'is-danger' : ''}"
      type=${type}
      placeholder=${placeholder}
      value=${value}
      id=${id}
      oninput=${e => oninput(e.target.value)}
    >
    ${errorMessages(errors)}
  </p>
  `
}
