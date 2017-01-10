const html = require('choo/html')

module.exports = ({
  message = '',
  type = 'primary',
  visible = false
}) => {
  return html`
    <div class="notification is-${type} snackbar ${visible ? 'visible' : ''}">
      ${message}
    </div>
  `
}
