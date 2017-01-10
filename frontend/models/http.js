const http = require('axios')

const client = () => {
  return http.create({
    baseURL: '/api',
    transformResponse: [JSON.parse]
  })
}

const getHeaders = (token) => {
  return {
    'Authorization': `Bearer ${token}`
  }
}

const handleResponse = (promise, {
  onSuccess = () => {},
  onFailure = () => {}
} = {}) => {
  promise.then(response => {
    console.log('handling a succussful response')
    onSuccess(response.data)
  }).catch(response => {
    onFailure(response.response.data)
  })
}

module.exports = () => {
  return {
    namespace: 'http',

    state: {
      client: client(),
      accessToken: null
    },

    reducers: {
      setToken (state, accessToken, send) {
        return { accessToken }
      }
    },

    effects: {
      get (state, payload, send, done) {
        const options = {
          headers: payload.auth ? getHeaders(state.accessToken) : {}
        }
        handleResponse(state.client.get(payload.url, options), payload)
      },

      post (state, payload, send, done) {
        handleResponse(state.client.post(payload.url, payload.data), payload)
      }
    }
  }
}
