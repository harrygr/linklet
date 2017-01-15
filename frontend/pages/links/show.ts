import html from 'choo/html'
import comment from '../../components/comment'
import * as map from 'lodash/fp/map'
import linkBox from '../../components/link'

const commentList = (comments) => {
  return html`
    <div class="box">
    <ul>
    ${map(comment, comments)}
    </ul>
    </div>
  `
}

const renderLink = link => {
  return [
  linkBox(link, {single: true}),
  html`<p>${link.comments.length} Comments</p>`,
  link.comments.length ? commentList(link.comments) : ''
  ]
}

export default (state, prev, send) => {
  const onunload = () => {
    send('links:setLink', null)
  }

  const onload = () => {
     send('links:fetch', {id: state.location.params.id})
  }

  const link = state.links.link

  return html`
    <section id="links-show-page" onload=${onload} onunload=${onunload}>
    <p class="loading-indicator ${state.transition}">Loading...</p>
    ${link ? (state.transition == '' ? renderLink(link) : '') : ''}
    </section>
  `
}
