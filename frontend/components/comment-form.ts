import html from 'choo/html'
import TextField from './textfield'
import LoadingButton from './loading-button'

export default (state, prev, send) => {
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
    ${LoadingButton('Post', state.transition.button)}
  </p>
  </form>
  `
}
