import decorateFormModel from '../utils/decorate-form-model'

const form = () => ({
  url: '',
  title: ''
})

const constraints = () => ({
  url: {presence: true, url: true},
  title: {presence: true},
})

const emptyLink = () => {
  return {
    url: '',
    title: ''
  }
}

const model = () => {
  return {
    namespace: 'link',

    state: {
      links: [],
      link: null,
      linkNotFound: false,
      form: form(),
    },

    reducers: {
      resetForm: () => ({form: form()}),
      setLinks: (state, links) => ({links}),
      setLink: (state, link) => ({link}),
    },

    effects: {
      setAndValidate (state, payload, send, done) {
        send('link:setField', payload, () => {
          if (state.submitted) {
            send('link:validate', done)
          }
        })
      },

      store (state, payload, send, done) {
        send('link:setSubmitted', done)

        const onCreateLink = link => {
          send('location:set', '/links', done)
          send('alert:growl', {message: 'Link created', type: 'success'}, done)
          send('link:resetForm', done)
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
        send('link:validate', submit)
      },

      fetchAll (state, payload, send, done) {
        send('http:get', {
          url: '/links',
          auth: false,
          onSuccess: links => send('link:setLinks', links, done),
          onFailure: response => send('alert:growl', {
            message: 'Could not fetch links: ' + response,
            type: 'danger'
          }, done)
        }, done)
      },

      fetch (state, {id}, send, done) {
        send('http:get', {
          url: `/links/${id}`,
          auth: false,
          onSuccess: link => send('link:setLink', link, done),
          onFailure: response => {
            send('alert:growl', {
              message: `Could not find link: ${response}`,
              type: 'danger',
            }, done)
          }
        }, done)
      }
    }
  }
}

export default decorateFormModel({
  model: model(),
  constraints: constraints()
})
