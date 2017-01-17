import html from 'choo/html'
import TextField from '../components/textfield'
import LoadingButton from '../components/loading-button'

export default (state, prev, send) => {
  const onunload = () => {
    send('register:resetValidator')
    send('register:resetForm')
  }
  const updateForm = key => value => send('register:setAndValidate', {key, value})
  const submitForm = (e) => {
    e.preventDefault()
    send('register:submitForm')
  }

  return html`
  <section class="container" id="register-page" onunload=${onunload}>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">
          Register an Account
        </h1>
        <form class="box" onsubmit=${submitForm} novalidate>

          ${TextField({
            label: 'Username',
            id: 'username',
            placeholder: 'jsmith',
            value: state.register.form.username,
            oninput: updateForm('username'),
            errors: state.register.errors.username
          })}

          ${TextField({
            label: 'Email',
            id: 'email',
            placeholder: 'jsmith@example.org',
            type: 'email',
            value: state.register.form.email,
            oninput: updateForm('email'),
            errors: state.register.errors.email
          })}

          <hr>
          ${TextField({
            label: 'Password',
            id: 'password',
            placeholder: '',
            type: 'password',
            value: state.register.form.password,
            oninput: updateForm('password'),
            errors: state.register.errors.password
          })}

          ${TextField({
            label: 'Confirm Password',
            id: 'password_confirmation',
            placeholder: '',
            type: 'password',
            value: state.register.form.password_confirmation,
            oninput: updateForm('password_confirmation'),
            errors: state.register.errors.password_confirmation
          })}

          <hr>
          <p class="control">
            ${LoadingButton('Sign Up', state.transition.button)}
          </p>
        </form>
        <p class="has-text-centered">
          <a href="/login">Login</a>
        </p>
      </div>
    </div>
    </section>
  `
}
