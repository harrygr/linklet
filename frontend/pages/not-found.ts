import html from 'choo/html'

export default (state, prev, send) => {
  return html`
    <section>
      <h1>404 Not Found</h1>
      <p>There's no page here. Try somewhere else!</p>
    </section>
  `
}
