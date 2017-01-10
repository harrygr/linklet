const html = require('choo/html')

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
  <div>
  <label class="label" for=${id}>${label}</label>
  <p class="control">
    <input
      class="input"
      type=${type}
      placeholder=${placeholder}
      value=${value}
      id=${id}
      oninput=${e => oninput(e.target.value)}
    >
  </p>
  </div>
  `
}
