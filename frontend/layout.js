const html = require('choo/html')
const navMenu = require('./layout/nav-menu')
const notification = require('./components/notification')

module.exports = (page, {hero = false} = {}) => (state, prev, send) => {
  const checkAuth = () => {
    if (!state.http.accessToken) {
      return send('auth:check')
    }
    console.log('not checking for a token in storage as we already have one in state')
  }

  return html`
  <div onload=${checkAuth}>
  ${notification(state.alert)}
  <nav class="nav has-shadow" id="top" style="position:fixed; right: 0; left: 0">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item" href="/">
          PHEDDIT
        </a>
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      ${navMenu(state, prev, send)}
    </div>
  </nav>
  <main class="${hero ? 'is-dark hero is-fullheight' : 'clears-navbar'}">
    <div class="${hero ? 'hero-body' : 'section'} content">
      ${page(state, prev, send)}
    </div>
  </main>

  <style>
    .clears-navbar {
      padding-top: 40px;
    }

    .snackbar {
      position: fixed;
      margin: 0!important;
      border-radius: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: transform .25s cubic-bezier(.4,0,1,1),-webkit-transform .25s cubic-bezier(.4,0,1,1);
      transform: translate(0, 100%);
    }
    .snackbar.visible {
      transform: translate(0, 0);
    }
  </style>
  </div>
  `
}
