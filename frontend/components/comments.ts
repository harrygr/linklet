import html from 'choo/html'
import comment from './comment'
import * as map from 'lodash/fp/map'

export default (state) => {
  const comments = state.comment.comments

  return comments.length ? [
    html`<p class="loading-indicator ${state.transition.comment}">Loading...</p>`,
    html`<div class="box ${state.transition.comment}">
    <ul>
    ${map(comment, comments)}
    </ul>
    </div>`
  ] : ''
}
