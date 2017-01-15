import app from './app'
import http from './http'
import alert from './alert'
import register from './register'
import auth from './auth'
import link from './link'
import comment from './comment'

/**
 * Register your models here
 * @type {Array}
 */
export default [
  // domain
  app(),
  http(),
  auth(),
  link(),
  comment(),
  register(),

  // components
  alert(),
]
