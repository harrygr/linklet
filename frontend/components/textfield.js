const html = require('choo/html')
const map = require('lodash/fp/map')

const renderError = (error) => {
  return html`<span class="help is-danger">${error}</span>`
}
const errorMessages = map(renderError)

module.exports = ({
  type = 'text',
  label = '',
  id = '',
  errors = [],
  value = '',
  oninput = () => {},
  placeholder = ''
}) => {
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
