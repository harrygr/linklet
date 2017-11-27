import * as React from 'react'
import * as ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'

import store from './store'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import NotFound from './pages/404'
import TestPage from './pages/test'
import ShowLink from './pages/links/show'
import { Switch } from 'react-router'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/links/:id" component={ShowLink} />
          <Route path="/test" component={TestPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
