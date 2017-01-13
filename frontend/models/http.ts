import http from 'axios'

interface HttpPayload {
  url: string
  onSuccess: Function
  onFailure?: Function
  auth?: boolean
  data?: Object
}

const client = () => {
  return http.create({
    baseURL: '/api',
    transformResponse: [JSON.parse]
  })
}

const getHeaders = (token: string) => {
  return {
    'Authorization': `Bearer ${token}`
  }
}

interface ResponseHandlers {
  onSuccess: Function
  onFailure?: Function
}

const handleResponse = (promise, handlers: ResponseHandlers, send) => {
  const removeTransition = () => {
    setTimeout(() => {
      send('setTransition', '', () => {})
    }, 200)
  }

  const fadeOutLoader = () => {
    setTimeout(() => {
      send('setTransition', 'fadeOut', removeTransition)
    }, 200)
  }

  promise.then(response => {
    console.log('handling a succussful response')
    handlers.onSuccess(response.data)
    fadeOutLoader()

  }).catch(response => {
    handlers.onFailure(response.response.data)
    fadeOutLoader()
  })
}

export default () => {
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
      get (state, payload: HttpPayload, send, done) {
        send('setTransition', 'fadeIn', done)
        const options = {
          headers: payload.auth ? getHeaders(state.accessToken) : {}
        }
        handleResponse(state.client.get(payload.url, options), payload, send)
      },

      post (state, payload: HttpPayload, send, done) {
        send('setTransition', 'fadeIn', done)
        const options = {
          headers: payload.auth ? getHeaders(state.accessToken) : {}
        }
        handleResponse(state.client.post(payload.url, payload.data, options), payload, send)
      }
    }
  }
}
