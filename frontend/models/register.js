const decorateFormModel = require('../utils/decorate-form-model')

const form = () => ({
  username: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const constraints = () => ({
  username: {presence: true},
  email: {presence: true, email: true},
  password: {presence: true, length: {min: 6}},
  password_confirmation: {equality: 'password'}
})

const model = () => {
  return {
    namespace: 'register',

    state: {
      form: form()
    },

    reducers: {
      resetForm () {
        return {form: form()}
      },
    },

    effects: {
      setAndValidate (state, payload, send, done) {
        send('register:setField', payload, () => {
          if (state.submitted) {
            send('register:validate', done)
          }
        })
      },

      submitForm (state, payload, send, done) {
        send('auth:setSubmitted', done)
        const submit = (_, globalState) => {
          if (!globalState.register.valid) {
            console.log('not registering due to invalid form')
            return
          }
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
        send('register:validate', submit)
      }
    }
  }
}

module.exports = decorateFormModel({
  model: model(),
  constraints: constraints()
})
