import html from 'choo/html'

export default (state, prev, send) => {
  const growl = () => send('alert:growl', {message: 'Hey there!'})
  const growlDanger = () => send('alert:growl', {message: 'Something ain\'t right for 8 seconds!', type: 'danger', timeout: 8000})

  return html`
      <section>
        <h1>Title: Welcome ${state.user}</h1>

        <button type="button" class="button is-primary" onclick=${growl}>Growl</button>
        <button type="button" class="button is-danger" onclick=${growlDanger}>Growl Danger</button>
      </section>
    `
}
