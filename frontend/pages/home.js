const html = require('choo/html')

module.exports = (state, prev, send) => {
  const setUser = () => send('setUser', 'Bobby')
  const growl = () => send('alert:growl', {message: 'Hey there!'})
  const growlDanger = () => send('alert:growl', {message: 'Something ain\'t right!', type: 'danger', timeout: 99999})

  return html`
      <section>
        <h1>Title: Welcome ${state.user}</h1>

        <button type="button" class="button is-primary" onclick=${setUser}>Update User</button>
        <button type="button" class="button is-primary" onclick=${growl}>Growl</button>
        <button type="button" class="button is-danger" onclick=${growlDanger}>Growl Danger</button>
      </section>
    `
}
