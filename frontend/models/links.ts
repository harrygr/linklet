import decorateFormModel from '../utils/decorate-form-model'

const form = () => ({
  url: '',
  title: ''
})

const constraints = () => ({
  url: {presence: true, url: true},
  title: {presence: true},
})

const model = () => {
  return {
    namespace: 'links',

    state: {
      links: [],
      form: form()
    },

    reducers: {
      resetForm: () => ({form: form()}),
      set(state, links) {
        return {links}
      }
    },

    effects: {
      setAndValidate (state, payload, send, done) {
        send('links:setField', payload, () => {
          if (state.submitted) {
            send('links:validate', done)
          }
        })
      },

      store (state, payload, send, done) {
        send('links:setSubmitted', done)

        const onCreateLink = link => {
          send('location:set', '/links', done)
          send('alert:growl', {message: 'Link created', type: 'success'}, done)
          send('links:resetForm', done)
        }

        const submit = (_, globalState) => {
          if (!globalState.links.valid) {
            console.log('not creating link due to invalid form')
            return
          }

          send('http:post', {
            url: '/links',
            data: state.form,
            auth: true,
            onSuccess: onCreateLink,
            onFailure: () => send('alert:growl', {message: 'Link creation failed', type: 'danger'}, done)
          }, done)
        }
        send('links:validate', submit)
      },

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

export default decorateFormModel({
  model: model(),
  constraints: constraints()
})