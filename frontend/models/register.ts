import decorateFormModel from '../utils/decorate-form-model'
import {ModelDependencies} from './'

const defaultForm = () => ({
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

const model = ({form, transport}: Partial<ModelDependencies>) => {
  const namespace = 'register'
  const formModel = form(namespace, constraints(), defaultForm)

  return {
    namespace: 'register',

    state: {
      ...formModel.state,
    },

    reducers: {
      ...formModel.reducers,
    },

    effects: {
      ...formModel.effects,
      submitForm (state, payload, send, done) {
        send('register:setSubmitted')
        .then(() => send('register:validate'))
        .then(response => {
          if (!response.register.valid) {
            throw new Error('Form is not valid')
          }
          return transport.post({
            url: '/users',
            data: state.form
          })
        })
        .then(response => send('alert:growl', {message: 'Welcome aboard', type: 'success'}))
        .then(response => send('location:set', '/login'))
        .catch(response => send('alert:growl', {message: 'Registration failed!', type: 'danger'}))
      }
    }
  }
}

export default model

