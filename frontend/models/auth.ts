import decorateFormModel from '../utils/decorate-form-model'

const form = () => ({
  email: '',
  password: ''
})

const constraints = () => ({
  email: {presence: true, email: true},
  password: {presence: true, length: {min: 6}}
})


interface AuthDependencies {
  storage?: any
}

const model = ({
  storage
}: AuthDependencies = {
  storage: window.localStorage
}) => {
  const isLoggedIn = storage.getItem('tokens') ? true : false

  return {
    namespace: 'auth',

    state: {
      form: form(),
      isLoggedIn
    },

    reducers: {
      resetForm () {
        return {form: form()}
      },
    },

    effects: {
      setAndValidate (state, payload, send, done) {
        send('auth:setField', payload, () => {
          if (state.submitted) {
            send('auth:validate', done)
          }
        })
      },

      getToken (state, payload, send, done) {
        send('auth:setSubmitted', done)
        const login = (_, globalState) => {
          if (!globalState.auth.valid) {
            console.log('not logging in due to invalid form')
            return
          }
          send('http:post', {
            url: '/auth',
            data: state.form,
            onSuccess: response => {
              send('auth:login', response, done)
            },
            onFailure: response => {
              send('alert:growl', {
                message: 'Login Failed',
                type: 'danger'
              }, done)
              console.log(response)
            },
          }, done)
        }

        send('auth:validate', null, login)
      },

      init (state, payload, send, done) {
        console.log('checking for a token')
        const tokenJson = storage.getItem('tokens')
        if (tokenJson) {
          const tokens = JSON.parse(tokenJson)
          console.log('found', tokens)
          send('http:setToken', tokens.jwt, done)
          send('setUser', tokens.user, done)
        }
      },

      storeTokens (state, payload, send, done) {
        storage.setItem('tokens', JSON.stringify(payload))
      },

      forgetTokens (state, payload, send, done) {
        storage.removeItem('tokens')
        send('http:setToken', null, done)
      },

      login (state, payload, send, done) {
        send('auth:resetForm', null, done)
        send('auth:storeTokens', payload, done)
        send('http:setToken', payload.jwt, done)
        send('setUser', payload.user, done)
        send('location:set', '/', done)
        send('alert:growl', {message: 'Successfully logged in!', type: 'success'}, done)
      },

      logout (state, payload, send, done) {
        send('auth:forgetTokens', null, done)
        send('setUser', null, done)
        send('location:set', '/', done)
        send('alert:growl', {message: 'You are now logged out!', type: 'success'}, done)
      }
    }
  }
}

export default decorateFormModel({
  model: model(),
  constraints: constraints()
})