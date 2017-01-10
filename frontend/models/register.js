const form = () => ({
  username: '',
  email: '',
  password: '',
  password_confirmation: ''
})

module.exports = () => {
  return {
    namespace: 'register',

    state: {
      form: form()
    },

    reducers: {
      resetForm () {
        return {form: form()}
      },

      setField (state, {key, value}) {
        return {form: {...state.form, [key]: value}}
      }
    },

    effects: {
      submitForm (state, payload, send, done) {
        send('http:post', {
          url: '/users',
          data: state.form,
          onSuccess: response => {
            console.log(response)
            send('register:resetForm', null, done)
            send('location:set', '/login', done)
            send('alert:growl', {
              message: 'Welcome aboard! Login with your credentials.',
              type: 'success'
            }, done)
          },
          onFailure: response => {
            send('alert:growl', {
              message: 'Registration failed!',
              type: 'danger'
            }, done)
            console.log(response)
          }
        }, done)
      }
    }
  }
}
