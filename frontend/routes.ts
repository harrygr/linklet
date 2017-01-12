import layout from './layout'
import middleware from './middleware/index'
import * as compose from 'lodash/fp/compose'

import home from './pages/home'
import register from './pages/register'
import login from './pages/login'
import listLinks from './pages/links/index'
import createLink from './pages/links/create'

const guestView = compose(middleware.redirectIfAuthenticated, layout)
const protectedView = compose(middleware.redirectIfGuest, layout)

const linkRoutes = () => [
  ['/', layout(listLinks)],
  ['/new', protectedView(createLink)]
]

export default () => [
  ['/', layout(home)],
  ['/register', guestView(register, {hero: true})],
  ['/login', guestView(login, {hero: true})],
  ['/links', linkRoutes()],
]
