import decorateFormModel from '../utils/decorate-form-model'
import {Transport} from '../transport/types'
import {FormConstructor} from './form'

const defaultForm = () => ({
  email: '',
  password: ''
})

const constraints = () => ({
  email: {presence: true, email: true},
  password: {presence: true, length: {min: 6}}
})


interface AuthDependencies {
  transport: Transport
  storage?: any
  form: FormConstructor
}


const model = ({
  form,
  transport,
  storage,
}: AuthDependencies) => {
  const namespace = 'auth'
  const tokens = storage.getItem('tokens')
  const formModel = form(namespace, constraints(), defaultForm)

  return {
    namespace,

    state: {
      ...formModel.state,
      isLoggedIn: !!tokens,
      tokens: tokens ? JSON.parse(tokens) : null,
    },

    reducers: {
      ...formModel.reducers,
      setTokens: (state, tokens) => ({tokens}),
      setLoggedIn: () => ({isLoggedIn: true}),
      setLoggedOut: () => ({isLoggedIn: false}),
    },

    effects: {
      ...formModel.effects,
      getToken (state, payload, send, done) {
        return send('auth:setSubmitted')
        .then(() => send('auth:validate', null))
        .then(response => {
          if (!response.auth.valid) {
            throw new Error('not logging in due to invalid form')
          }
          return transport.post({
            url: '/auth',
            data: state.form
          })
          .then(response => send('auth:login', response))
          .catch(err => {
            return send('alert:growl', {message: 'Invalid Credentials', type: 'danger'})
          })
        })
      },

      init (state, payload, send, done) {
        const tokenJson = storage.getItem('tokens')
        console.log('checking for a token')
        if (tokenJson) {
          const tokens = JSON.parse(tokenJson)
          return send('setUser', tokens.user)
        }
      },

      storeTokens (state, tokens, send, done) {
        storage.setItem('tokens', JSON.stringify(tokens))
        return send('auth:setTokens', tokens)
      },

      forgetTokens (state, payload, send, done) {
        storage.removeItem('tokens')
        return send('auth:setTokens', null)
      },

      login (state, payload, send, done) {
        return send('auth:resetForm', null)
        .then(response => {
          send('location:set', '/')
          return response
        })
        .then(() => send('auth:storeTokens', payload))
        .then(() => send('auth:setLoggedIn'))
        .then(() => send('setUser', payload.user))
        .then(() => send('alert:growl', {message: 'Successfully logged in!', type: 'success'}))
      },

      logout (state, payload, send, done) {
        return send('auth:forgetTokens', null)
        .then(() => send('setUser', null))
        .then(() => send('auth:setLoggedOut'))
        .then(() => send('alert:growl', {message: 'You are now logged out!', type: 'success'}))
        .then(() => send('location:set', '/'))
      }
    }
  }
}

export default model
