import decorateFormModel from '../utils/decorate-form-model'
import {ModelDependencies} from './'

const defaultForm = () => ({
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

const model = ({transport, form}: Partial<ModelDependencies>) => {
  const formModel = form('link', constraints(), defaultForm)
  return {
    namespace: 'link',

    state: {
      ...formModel.state,
      links: [],
      link: null,
      linkNotFound: false,
    },

    reducers: {
      ...formModel.reducers,
      setLinks: (state, links) => ({links}),
      setLink: (state, link) => ({link}),
    },

    effects: {
      ...formModel.effects,

      store (state, payload, send, done) {
        send('link:setSubmitted')
        .then(response => {
          return transport.post({
            url: '/links',
            data: state.form,
            token: response.auth.tokens.jwt
          })
        })
        .then(response => send('alert:growl', {message: 'Link created', type: 'success'}))
        .then(response => send('link:resetForm'))
        .then(response => send('location:set', '/links'))
        .catch(err => send('alert:growl', {message: `Link creation failed ${err}`, type: 'danger'}))
      },

      fetchAll (state, payload, send, done) {
        return transport.get({url: '/links'})
        .then(links => send('link:setLinks', links))
        .catch(response => send('alert:growl', {message: 'Could not fetch links: ' + response, type: 'danger'}))
      },

      fetch (state, {id}, send, done) {
        return transport.get({url: `/links/${id}`})
        .then(link => send('link:setLink', link))
        .catch(response => send('alert:growl', {message: 'Could not find link: ' + response, type: 'danger'}))
      }
    }
  }
}

export default model
