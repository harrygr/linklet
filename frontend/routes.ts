import layout from './layout'
import middleware from './middleware/index'
import * as compose from 'lodash/fp/compose'

import home from './pages/home'
import register from './pages/register'
import login from './pages/login'
import listLinks from './pages/links/index'
import createLink from './pages/links/create'
import showLink from './pages/links/show'
import notFound from './pages/not-found'

const guestView = compose(middleware.redirectIfAuthenticated, layout)
const protectedView = compose(middleware.redirectIfGuest, layout)

const linkRoutes = () => [
  ['/new', protectedView(createLink)],
  ['/:id', layout(showLink)],
]

export default () => [
  ['/', layout(listLinks)],
  ['/register', guestView(register, {hero: true})],
  ['/login', guestView(login, {hero: true})],
  ['/links', linkRoutes()],
  [':anything', layout(notFound)]
]
