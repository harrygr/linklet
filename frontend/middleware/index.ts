import html from 'choo/html'

const redirectIfAuthenticated = page => (state, prev, send) => {
  if (state.user) {
    send('location:set', '/')
    send('alert:growl', {
      message: 'You can\'t go here whilst you are logged in',
      type: 'danger'
    })

    return html`<div></div>`
  }
  return page(state, prev, send)
}

const redirectIfGuest = page => (state, prev, send) => {
  if (!state.auth.isLoggedIn) {
    send('location:set', '/')
    send('alert:growl', {
      message: 'You must be logged in to go here',
      type: 'danger'
    })

    return html`<div></div>`
  }
  return page(state, prev, send)
}

export default { redirectIfAuthenticated, redirectIfGuest }
