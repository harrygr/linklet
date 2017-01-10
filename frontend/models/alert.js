module.exports = () => ({
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
      send('alert:hide', null, done)
      send('alert:set', {message, type }, done)
      setTimeout(() => {
        send('alert:hide', null, done)
      }, timeout)
    }
  }
})
