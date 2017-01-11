const html = require('choo/html')
const moment = require('moment')

module.exports = (link) => {
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
          <small>${moment(link.inserted_at).fromNow()}</small>
          </p>
        </div>
      </div>
    </article>
  </div>
  `
}
