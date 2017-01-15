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
      form: form()
    },

    reducers: {
      resetForm: () => ({form: form()}),
    },

    effects: {
      setAndValidate (state, payload, send, done) {
        send('comment:setField', payload, () => {
          if (state.submitted) {
            send('comment:validate', done)
          }
        })
      },

      store (state, payload, send, done) {
        send('comment:setSubmitted', done)

        const onCreateComment = link => {
          send('alert:growl', {message: 'Comment posted!', type: 'success'}, done)
          send('comment:resetForm', done)
        }

        const submit = (_, globalState) => {
          if (!globalState.comment.valid) {
            console.log('not creating comment due to invalid form')
            return
          }

          send('http:post', {
            url: '/comments',
            data: {...state.form, link_id: globalState.link.link.id},
            auth: true,
            onSuccess: onCreateComment,
            onFailure: (response) => send('alert:growl', {message: 'Comment creation failed: ' + response, type: 'danger'}, done)
          }, () => {
            send('link:fetch', {id: globalState.link.link.id}, done)
          })
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
