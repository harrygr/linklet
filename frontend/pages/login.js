const html = require('choo/html')
const TextField = require('../components/textfield')

module.exports = (state, prev, send) => {
  const updateForm = key => value => send('auth:setField', {key, value})
  const submitForm = () => { send('auth:getToken')}

  return html`
    <section class="container">
    <div class="columns is-vcentered">
      <div class="column is-4 is-offset-4">
        <h1 class="title">
          Login
        </h1>
        <div class="box">

          ${TextField({
            label: 'Email',
            id: 'email',
            placeholder: 'jsmith@example.org',
            type: 'email',
            value: state.auth.form.email,
            oninput: updateForm('email')
          })}

          <hr>
          ${TextField({
            label: 'Password',
            id: 'password',
            placeholder: '',
            type: 'password',
            value: state.auth.form.password,
            oninput: updateForm('password')
          })}

          <hr>
          <p class="control">
            <button class="button is-primary is-fullwidth" onclick=${submitForm}>Login</button>
          </p>
        </div>
        <p class="has-text-centered">
          <a href="/login">Login</a>
        </p>
      </div>
    </div>
    </section>
  `
}
