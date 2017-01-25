import html from 'choo/html'
import linkBox from '../../components/link'
import comments from '../../components/comments'
import commentForm from '../../components/comment-form'


export default (state, prev, send) => {
  const linkId = state.location.params.id

  const onunload = () => {
    send('link:setLink', null)
    send('comment:resetForm', null)
    send('comment:setComments', [])
  }

  const onload = () => {
     if (!state.link.link) {
       send('link:fetch', {id: linkId})
     }
     send('comment:fetch', {linkId})
  }

  const link = state.link.link

  return html`
    <section id="links-show-page" onload=${onload} onunload=${onunload}>
    <p class="loading-indicator ${state.transition.link}">Loading...</p>
    ${link ? [
      state.transition.link == '' ? linkBox(link, send, {single: true}) : '',
      commentForm(state, prev, send),
      html`<p>${state.comment.comments.length} Comments</p>`,
      comments(state)
    ] : ''}
    </section>
  `
}
