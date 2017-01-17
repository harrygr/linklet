import decorateFormModel from '../utils/decorate-form-model'

const form = () => {
  return {
    body: ''
  }
}

const constraints = () => {
  return {
    body: {presence: true}
  }
}

const model = () => {
  return {
    namespace: 'comment',
    state: {
      form: form(),
      comments: []
    },

    reducers: {
      resetForm: () => ({form: form()}),
      setComments (state, comments) {
        return {comments}
      },
      prepend (state, comment) {
        return {comments: [comment].concat(state.comments)}
      }
    },

    effects: {
      fetch (state, {linkId}, send, done) {
        send('http:get', {
          url: `/links/${linkId}/comments`,
          auth: false,
          domain: 'comment',
          onSuccess: comments => send('comment:setComments', comments, done),
          onFailure: response => {
            send('alert:growl', {
              message: `Could not load comments: ${response}`,
              type: 'danger',
            }, done)
          }
        }, done)
      },

      setAndValidate (state, payload, send, done) {
        send('comment:setField', payload, () => {
          if (state.submitted) {
            send('comment:validate', done)
          }
        })
      },

      store (state, payload, send, done) {
        send('comment:setSubmitted', done)

        const onCreateComment = comment => {
          send('alert:growl', {message: 'Comment posted!', type: 'success'}, done)
          send('comment:resetForm', done)
          send('comment:prepend', comment, done)
        }

        const submit = (_, globalState) => {
          if (!globalState.comment.valid) {
            console.log('not creating comment due to invalid form')
            return
          }

          const linkId = globalState.link.link.id

          send('http:post', {
            url: `links/${linkId}/comments`,
            data: state.form,
            auth: true,
            domain: 'button',
            onSuccess: onCreateComment,
            onFailure: (response) => send('alert:growl', {message: 'Comment creation failed: ' + response, type: 'danger'}, done)
          }, done)
        }
        send('comment:validate', submit)
      },
    }
  }
}

export default decorateFormModel({
  model: model(),
  constraints: constraints()
})
