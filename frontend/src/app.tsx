import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'react-emotion'
import Home from './pages/home'
import NotFound from './pages/404'
import ShowLink from './pages/links/show'
import { Switch } from 'react-router'
import Alert from './components/alert'
import Login from './pages/login'
import Register from './pages/register'
import NewLink from './pages/links/new'
import Navbar from './components/navbar'
import actions from './store/actions'
import { AlertLevel } from './store/ui/reducer'
import { connect, Dispatch } from 'react-redux'
import { State } from './store/index'
import { State as UiState } from './store/ui/reducer'

interface Props extends StateMappedToProps, DispatchMappedToProps {}

const AppWrapper = styled('div')`
  background: #f2f3f5;
  min-height: 100vh;
  padding-bottom: 20px;
`

const PageContainer = styled('div')`
  max-width: 800px;
  margin: 0 auto;
  border-radius: 2px;
`

export function App({ flashAlert, logout, isLoggedIn, alert, loading }: Props) {
  return (
    <Router>
      <AppWrapper>
        <Navbar
          isLoggedIn={isLoggedIn}
          logout={() => {
            logout()
            flashAlert('You are now logged out', 'success')
          }}
          isLoading={loading}
        />
        <Alert message={alert.message} level={alert.level} />

        <PageContainer>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/top/:page(\\d+)" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/links/new" component={NewLink} />
            <Route path="/links/:id(\\d+)" component={ShowLink} />
            <Route component={NotFound} />
          </Switch>
        </PageContainer>
      </AppWrapper>
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
  logout: () => any
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
    logout: () => dispatch(actions.Logout()),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(App)
