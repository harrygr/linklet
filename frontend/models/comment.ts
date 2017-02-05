import decorateFormModel from '../utils/decorate-form-model'
import {ModelDependencies} from './'

const defaultForm = () => {
  return {
    body: ''
  }
}

const constraints = () => {
  return {
    body: {presence: true}
  }
}

const model = ({form, transport}: Partial<ModelDependencies>) => {
  const namespace = 'comment'
  const formModel = form(namespace, constraints(), defaultForm)

  return {
    namespace,
    state: {
      ...formModel.state,
      comments: []
    },

    reducers: {
      ...formModel.reducers,
      setComments (state, comments) {
        return {comments}
      },
      prepend (state, comment) {
        return {comments: [comment].concat(state.comments)}
      }
    },

    effects: {
      ...formModel.effects,
      fetch (state, {linkId}, send, done) {
        return transport.get({url: `/links/${linkId}/comments`})
        .then(comments => send('comment:setComments', comments))
        .catch(response => send('alert:growl', {message: `Could not load comments: ${response}`, type: 'danger'}))
      },

      store (state, payload, send, done) {
        return send('comment:validate')
        .then(() => send('comment:setSubmitted'))
        .then(response => {
          if (!response.auth.isLoggedIn) {
            throw new Error('You must be logged in to comment')
          }

          if (!response.comment.valid) {
            throw new Error('Form is invalid')
          }
          return transport.post({
            url: `links/${response.link.link.id}/comments`,
            data: state.form,
            token: response.auth.tokens.jwt,
          })
        })
        .then(comment => send('comment:prepend', comment))
        .then(() => send('comment:resetForm'))
        .then(() => send('alert:growl', {message: 'Comment posted!', type: 'success'}))
        .catch(response => send('alert:growl', {message: String(response), type: 'danger'}))
      },
    }
  }
}

export default model
