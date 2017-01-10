const html = require('choo/html')
const choo = require('choo')
const log = require('choo-log')
const layout = require('./layout')
const middleware = require('./middleware')
const {compose} = require('lodash/fp')

const app = choo()

app.use(log())

const models = require('./models')

models.map(model => app.model(model))

const guestView = compose(middleware.redirectIfAuthenticated, layout)
const protectedView = compose(middleware.redirectIfGuest, layout)

app.router([
  ['/', layout(require('./pages/home'))],
  ['/register', guestView(require('./pages/register'), {hero: true})],
  ['/login', guestView(require('./pages/login'), {hero: true})],
  ['/links', layout(require('./pages/links'))],
  ])

const tree = app.start()
document.body.appendChild(tree)
