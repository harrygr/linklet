const form = () => ({
  email: '',
  password: '',
})

module.exports = ({
  storage = window.localStorage
} = {}) => {
  return {
    namespace: 'auth',

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
      getToken (state, payload, send, done) {
        send('http:post', {
          url: '/auth',
          data: state.form,
          onSuccess: response => {
            send('auth:login', response, done)
          },
          onFailure: response => {
            console.log(response)
          },
        }, done)
      },

      check (state, payload, send, done) {
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
