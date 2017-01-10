const html = require('choo/html')
const TextField = require('../components/textfield')

module.exports = (state, prev, send) => {
  const updateForm = key => value => send('register:setField', {key, value})
  const submitForm = () => send('http:post', {
    url: '/users',
    data: state.register.form,
    onSuccess: response => {
      console.log(response)
      send('register:resetForm')
      send('location:set', '/')
    },
    onFailure: response => console.log(response)
  })

  return html`
  <section>
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">
          Register an Account
        </h1>
        <div class="box">

          ${TextField({
            label: 'Username',
            id: 'username',
            placeholder: 'jsmith',
            value: state.register.form.username,
            oninput: updateForm('username')
          })}

          ${TextField({
            label: 'Email',
            id: 'email',
            placeholder: 'jsmith@example.org',
            type: 'email',
            value: state.register.form.email,
            oninput: updateForm('email')
          })}

          <hr>
          ${TextField({
            label: 'Password',
            id: 'password',
            placeholder: '●●●●●●●',
            type: 'password',
            value: state.register.form.password,
            oninput: updateForm('password')
          })}

          ${TextField({
            label: 'Confirm Password',
            id: 'password_confirmation',
            placeholder: '●●●●●●●',
            type: 'password',
            value: state.register.form.password_confirmation,
            oninput: updateForm('password_confirmation')
          })}

          <hr>
          <p class="control">
            <button class="button is-primary" onclick=${submitForm}>Register</button>
            <button class="button is-default">Cancel</button>
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
