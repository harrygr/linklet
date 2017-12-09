import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
import NotFound from './pages/404'
import ShowLink from './pages/links/show'
import { Switch } from 'react-router'
import Alert from './components/alert'
import Loader from './components/loader'
import Login from './pages/login'
import NewLink from './pages/links/new'
import Navbar from './components/navbar'
import actions from './store/actions'
import { AlertLevel } from './store/ui/reducer'
import { connect, Dispatch } from 'react-redux'
import { State } from './store/index'
import { State as UiState } from './store/ui/reducer'

interface Props extends StateMappedToProps, DispatchMappedToProps {}

export function App({
  flashAlert,
  setToken,
  isLoggedIn,
  alert,
  loading,
}: Props) {
  return (
    <Router>
      <div>
        <Navbar
          isLoggedIn={isLoggedIn}
          logout={() => {
            setToken(null)
            flashAlert('You are now logged out', 'success')
          }}
        />
        <Alert message={alert.message} level={alert.level} />
        <Loader loading={loading} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route path="/links/new" component={NewLink} />
          <Route path="/links/:id(\\d+)" component={ShowLink} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

interface StateMappedToProps {
  isLoggedIn: boolean
  alert: UiState['alert']
  loading: boolean
}
interface DispatchMappedToProps {
  flashAlert: (message: string, level: AlertLevel) => any
  setToken: (token: string | null) => any
}

function mapStateToProps(state: State): StateMappedToProps {
  return {
    isLoggedIn: state.auth.token !== null,
    alert: state.ui.alert,
    loading: state.ui.loading,
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    flashAlert: (message: string, level: AlertLevel) =>
      dispatch(actions.flashAlert(message, level)),
    setToken: (token: string | null) => dispatch(actions.SetToken(token)),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(App)
