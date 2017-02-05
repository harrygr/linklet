import html from 'choo/html'

const redirectIfAuthenticated = page => (state, prev, send) => {
  if (state.user) {
    send('alert:growl', {
      message: 'You can\'t go here whilst you are logged in',
      type: 'danger'
    })
    send('location:set', '/')
    return html`<div></div>`
  }
  return page(state, prev, send)
}

const redirectIfGuest = page => (state, prev, send) => {
  if (!state.auth.isLoggedIn) {
    send('alert:growl', {
      message: 'You must be logged in to go here',
      type: 'danger'
    })
    send('location:set', '/')
    return html`<div></div>`
  }
  return page(state, prev, send)
}

export default { redirectIfAuthenticated, redirectIfGuest }
