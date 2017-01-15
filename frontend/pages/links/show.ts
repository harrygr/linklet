import html from 'choo/html'
import comment from '../../components/comment'
import * as map from 'lodash/fp/map'
import linkBox from '../../components/link'
import LoadingButton from '../../components/loading-button'
import TextField from '../../components/textfield'

const commentList = (comments) => {
  return html`
    <div class="box">
    <ul>
    ${map(comment, comments)}
    </ul>
    </div>
  `
}

const commentForm = (state, prev, send) => {
  const submitForm = e => {
    e.preventDefault()
    send('comment:store')
  }

  const updateForm = key => value => send('comment:setAndValidate', {key, value})

  return html`
  <form class="box" onsubmit=${submitForm} novalidate>

  ${TextField({
    label: 'Add a Comment',
    id: 'body',
    type: 'textarea',
    value: state.comment.form.body,
    oninput: updateForm('body'),
    errors: state.comment.errors.body
  })}

  <p class="control">
    ${LoadingButton('Post', state.transition)}
  </p>
  </form>
  `
}

export default (state, prev, send) => {
  const onunload = () => {
    send('link:setLink', null)
    send('comment:resetForm', null)
  }

  const onload = () => {
     send('link:fetch', {id: state.location.params.id})
  }

  const link = state.link.link

  return html`
    <section id="links-show-page" onload=${onload} onunload=${onunload}>
    <p class="loading-indicator ${state.transition}">Loading...</p>
    ${link ? (state.transition == '' ? [
      linkBox(link, {single: true}),
      commentForm(state, prev, send),
      html`<p>${link.comments.length} Comments</p>`,
      link.comments.length ? commentList(link.comments) : ''
    ]
    : '') : ''}
    </section>
  `
}
