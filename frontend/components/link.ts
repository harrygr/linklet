import html from 'choo/html'
import * as moment from 'moment'
import parseUrl from '../utils/url-parser'

export default (link, send, {single = false} = {}) => {
  const setLink = e => {
    send('link:setLink', link)
  }

  return html`
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
          ${single ? html`
          <h2><a href=${link.url}>${link.title}</a> <small>(${parseUrl(link.url)})</small></h2>
          ` : html`
          <h4><a href=${link.url}>${link.title}</a> <small>(${parseUrl(link.url)})</small></h4>
          `}
          <span>
          by <strong>${link.user.username}</strong> ${moment(link.inserted_at).fromNow()}
          ${!single ? ['| ', html`<a href="/links/${link.id}" onclick=${setLink}>${link.comments_count} comments</a>`] : ''}
          </span>
          </p>
        </div>
      </div>
    </article>
  </div>
  `
}
