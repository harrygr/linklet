import app from './app'
import http from './http'
import alert from './alert'
import register from './register'
import auth from './auth'
import links from './links'

/**
 * Register your models here
 * @type {Array}
 */
export default [
  // domain
  app(),
  http(),
  auth(),
  links(),
  register(),

  // components
  alert(),
]