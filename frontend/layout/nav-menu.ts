import html from 'choo/html'

const navMenuItem = (state, {
  href = '',
  content = ''
}) => {
  const isLocation = location => location === state.location.pathname

  return html`
  <a class="nav-item is-tab ${isLocation(href) ? 'is-active' : ''}" href=${href}>
    ${content}
  </a>
  `
}

export default (state, prev, send) => {
  const menuItems = [
    {href: '/', content: 'Home'},
  ].map(item => navMenuItem(state, item))

  const logout = () => send('auth:logout')

  return html`
    <div class="nav-right nav-menu">
      ${menuItems}

      ${state.user ? html`
      <span class="nav-item">
        <span class="nav-item">
          Hey, ${state.user.username}
        </span>
        <a class="button" onclick=${logout}>
          Log out
        </a>
      </span>
      ` : html`
      <span class="nav-item">
        <a class="button" href="/login">
          Log in
        </a>
        <a class="button is-info" href="/register">
          Sign up
        </a>
      </span>
      `}
    </div>
  `
}
