import {Promise} from 'es6-promise'

const promisifySend = send => {
  return (action, payload = null) => {
    return new Promise((resolve, reject) => {
      send(action, payload, (err, response) => {
        if (err) {
          reject(err)
          return
        }
        resolve(response)
      })
    })
  }
}

export default () => ({
  namespace: 'alert',

  state: {
    message: '',
    type: 'primary',
    visible: false,
  },

  reducers: {
    set (state, {message, type}) {
      return {message, type, visible: true}
    },

    hide (state) {
      return {message: '', visible: false}
    }
  },

  effects: {
    growl (state, {message, timeout = 4000, type = 'primary'}, send, done) {
      return send('alert:hide').then(response => {
        return send('alert:set', {message, type })
      }).then(response => {
        setTimeout(() => send('alert:hide'), timeout)
        return response
      })
    }
  }
})
