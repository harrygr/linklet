import html from 'choo/html'
import * as moment from 'moment'
import parseUrl from '../utils/url-parser'

export default (link) => {
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
          <h4><a href=${link.url}>${link.title}</a> <small>(${parseUrl(link.url)})</small></h4>

          <span>by <strong>${link.user.username}</strong> ${moment(link.inserted_at).fromNow()}</span>
          </p>
        </div>
      </div>
    </article>
  </div>
  `
}
