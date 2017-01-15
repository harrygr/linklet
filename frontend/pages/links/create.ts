import html from 'choo/html'
import TextField from '../../components/textfield'
import LoadingButton from '../../components/loading-button'

export default (state, prev, send) => {
  const onunload = () => {
    send('link:resetValidator')
    send('link:resetForm')
  }

  const submitForm = (e) => {
    e.preventDefault()
    send('link:store')
  }
  const updateForm = key => value => send('link:setAndValidate', {key, value})

  return html`
    <section id="links-create-page" onunload=${onunload}>
    <h1 class="title">New Link</h1>

    <form class="box" onsubmit=${submitForm} novalidate>

      ${TextField({
        label: 'URL',
        id: 'url',
        placeholder: 'http://foo.com',
        type: 'url',
        value: state.link.form.url,
        oninput: updateForm('url'),
        errors: state.link.errors.url
      })}

      ${TextField({
        label: 'Title',
        id: 'title',
        placeholder: 'Some sort of description',
        type: 'title',
        value: state.link.form.title,
        oninput: updateForm('title'),
        errors: state.link.errors.title
      })}

      <p class="control">
        ${LoadingButton('Create Link', state.transition)}
      </p>
      </form>
    </section>
  `
}
