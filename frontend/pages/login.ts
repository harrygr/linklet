import html from 'choo/html'
import TextField from '../components/textfield'
import LoadingButton from '../components/loading-button'

export default (state, prev, send) => {
  const onunload = () => {
    // send('auth:resetValidator')
    send('auth:resetForm')
  }
  const updateForm = key => value => send('auth:setAndValidate', {key, value})
  const submitForm = (e) => {
    e.preventDefault()
    send('auth:getToken')
  }

  return html`
    <section class="container" id="login-page" onunload=${onunload}>
    <div class="columns is-vcentered">
      <div class="column is-4 is-offset-4">
        <h1 class="title">
          Login
        </h1>
        <form class="box" onsubmit=${submitForm} novalidate>

          ${TextField({
            label: 'Email',
            id: 'email',
            placeholder: 'jsmith@example.org',
            type: 'email',
            value: state.auth.form.email,
            oninput: updateForm('email'),
            errors: state.auth.errors.email
          })}

          <hr>
          ${TextField({
            label: 'Password',
            id: 'password',
            placeholder: '',
            type: 'password',
            value: state.auth.form.password,
            oninput: updateForm('password'),
            errors: state.auth.errors.password
          })}

          <hr>
          <p class="control">
             ${LoadingButton('Login', state.transition.button)}
          </p>
        </form>
        <p class="has-text-centered">
          <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
    </section>
  `
}
