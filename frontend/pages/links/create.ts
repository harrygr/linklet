import html from 'choo/html'
import TextField from '../../components/textfield'
import LoadingButton from '../../components/loading-button'

export default (state, prev, send) => {
  const onunload = () => {
    send('links:resetValidator')
    send('links:resetForm')
  }

  const submitForm = (e) => {
    e.preventDefault()
    send('links:store')
  }
  const updateForm = key => value => send('links:setAndValidate', {key, value})

  return html`
    <section id="links-create-page" onunload=${onunload}>
    <h1 class="title">New Link</h1>

    <form class="box" onsubmit=${submitForm} novalidate>

      ${TextField({
        label: 'URL',
        id: 'url',
        placeholder: 'http://foo.com',
        type: 'url',
        value: state.links.form.url,
        oninput: updateForm('url'),
        errors: state.links.errors.url
      })}

      ${TextField({
        label: 'Title',
        id: 'title',
        placeholder: 'Some sort of description',
        type: 'title',
        value: state.links.form.title,
        oninput: updateForm('title'),
        errors: state.links.errors.title
      })}

      <p class="control">
        ${LoadingButton('Create Link', state.transition)}
      </p>
      </form>
    </section>
  `
}
