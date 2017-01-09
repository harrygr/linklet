const html = require('choo/html')

module.exports = (state, prev, send) => {
  const setUser = () => send('setUser', 'Bobby')

  return html`
      <article>
        <h1>Title: Welcome ${state.user}</h1>

        <button type="button" class="button is-primary" onclick=${setUser}>Update User</button>
      </article>
    `
}
