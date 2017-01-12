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

const handleResponse = (promise, handlers: ResponseHandlers) => {
  promise.then(response => {
    console.log('handling a succussful response')
    handlers.onSuccess(response.data)
  }).catch(response => {
    handlers.onFailure(response.response.data)
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
        const options = {
          headers: payload.auth ? getHeaders(state.accessToken) : {}
        }
        handleResponse(state.client.get(payload.url, options), payload)
      },

      post (state, payload: HttpPayload, send, done) {
        const options = {
          headers: payload.auth ? getHeaders(state.accessToken) : {}
        }
        handleResponse(state.client.post(payload.url, payload.data, options), payload)
      }
    }
  }
}
