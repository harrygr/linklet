import app from './app'
import alert from './alert'
import register from './register'
import auth from './auth'
import link from './link'
import comment from './comment'
import transition from './transition'
import form from './form'

import transport from '../transport'
import http from 'axios'
import {FormConstructor} from './form'
import {Transport} from '../transport/types'

const client = http.create({
    baseURL: '/api',
})

export interface ModelDependencies {
  form: FormConstructor
  storage: Storage
  transport: Transport
}

const modelDependencies = {
  form,
  storage: window.localStorage,
  transport: transport(client),
}

/**
 * Register your models here
 * @type {Array}
 */
export default [
  // domain
  app(),
  auth({transport: modelDependencies.transport, form: modelDependencies.form, storage: modelDependencies.storage}),
  link({transport: modelDependencies.transport, form: modelDependencies.form}),
  comment({transport: modelDependencies.transport, form: modelDependencies.form}),
  register({transport: modelDependencies.transport, form: modelDependencies.form}),
  transition(),

  // components
  alert(),
]
