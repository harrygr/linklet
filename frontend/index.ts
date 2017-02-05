import html from 'choo/html'
import * as choo from 'choo'
import * as log from 'choo-log'
import {Promise} from 'es6-promise'

import models from './models'
import routes from './routes'

const app = choo()

app.use(log())
app.use({wrapEffects})

models.map((model: Object) => app.model(model))

app.router(routes())

const tree = app.start()
document.body.appendChild(tree)


function promisifySend (send) {
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

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function wrapEffects (effect) {
  return (state, payload, send, done) => {
    const result = effect(state, payload, promisifySend(send), done)
    if (isPromise(result)) {
      result.then(response => done(null, response)).catch(done)
    }
  }
}
