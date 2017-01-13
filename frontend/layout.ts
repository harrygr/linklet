import html from 'choo/html'
import navMenu from './layout/nav-menu'
import notification from './components/notification'

export default (page, {hero = false} = {}) => (state, prev, send) => {
  const checkAuth = () => {
    return send('auth:init')
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


    /** TRANSITIONS **/
    .loading-indicator {
      opacity: 0;
      visibility: hidden;
    }
    .loading-indicator:not(.fadeIn):not(.fadeOut) {
      display: none;
    }
    .fadeIn {
      visibility: visible;
      opacity: 1;
      transition: visibility 0s linear 0s, opacity 700ms;
    }
    .fadeOut {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s linear 300ms, opacity 300ms;
    }

    /** BOX LIST */
    .box-list .box {
      margin-bottom: 0;
    }
    .box-list .box:not(:first-of-type) {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
    .box-list .box:not(:last-of-type) {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  </style>

  </div>
  `
}
