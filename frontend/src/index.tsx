import * as React from 'react'
import * as ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'

import store from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
import NotFound from './pages/404'
import ShowLink from './pages/links/show'
import { Switch } from 'react-router'
import Alert from './alert'
import Loader from './loader'
import Login from './pages/login'
import NewLink from './pages/links/new'
import Navbar from './navbar'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Navbar />
        <Alert />
        <Loader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route path="/links/new" component={NewLink} />
          <Route path="/links/:id" component={ShowLink} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
