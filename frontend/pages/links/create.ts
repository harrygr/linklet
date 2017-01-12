import html from 'choo/html'
import TextField from '../../components/textfield'

export default (state, prev, send) => {
  const submitForm = (e) => {
    e.preventDefault()
    send('links:store')
  }
  const updateForm = key => value => send('links:setAndValidate', {key, value})

  return html`
    <section>
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
        <button class="button is-primary" type="submit">Create Link</button>
      </p>
      </form>
    </section>
  `
}
