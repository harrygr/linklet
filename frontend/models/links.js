

module.exports = () => {
  return {
    namespace: 'links',

    state: {
      links: []
    },

    reducers: {
      set(state, links) {
        return {links}
      }
    },

    effects: {
      fetchAll (state, payload, send, done) {
        send('http:get', {
          url: '/links',
          auth: true,
          onSuccess: links => send('links:set', links, done),
          onFailure: response => send('alert:growl', {
            message: 'Could not fetch links: ' + JSON.stringify(response),
            type: 'danger'
          }, done)
        }, done)
      }
    }
  }
}
