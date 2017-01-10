const html = require('choo/html')

const link = (link) => {
  return html`
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
          <a href=${link.url}>${link.title}</a>
          </p>
        </div>
      </div>
    </article>
  </div>
  `
}

module.exports = (state, prev, send) => {
  return html`
    <section onload=${() => send('links:fetchAll')} >
    <h1 class="title">Links</h1>

    ${state.links.links.map(link)}
    </section>
  `
}
