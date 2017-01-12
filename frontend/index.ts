import html from 'choo/html'
import * as choo from 'choo'
import * as log from 'choo-log'
import layout from './layout'
import middleware from './middleware/index'
import * as compose from 'lodash/fp/compose'

import home from './pages/home'
import register from './pages/register'
import login from './pages/login'
import listLinks from './pages/links/index'
import createLink from './pages/links/create'

import models from './models'

const app = choo()

app.use(log())


models.map(model => app.model(model))

const guestView = compose(middleware.redirectIfAuthenticated, layout)
const protectedView = compose(middleware.redirectIfGuest, layout)

app.router([
  ['/', layout(home)],
  ['/register', guestView(register, {hero: true})],
  ['/login', guestView(login, {hero: true})],
  ['/links', layout(listLinks)],
  ['/links/new', layout(createLink)],
  ])

const tree = app.start()
document.body.appendChild(tree)
