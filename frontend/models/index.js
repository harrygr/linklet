/**
 * Register your models here
 * @type {Array}
 */
module.exports = [
  require('./app')(),
  require('./http')(),
  require('./alert')(),
  require('./register')(),
  require('./auth')(),
  require('./links')(),
]
