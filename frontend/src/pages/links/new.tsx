import * as React from 'react'

import { State } from '../../store/index'

import { Dispatch, connect } from 'react-redux'
import { Redirect } from 'react-router'

interface StateMappedToProps {
  isLoggedIn: boolean
}
interface DispatchMappedToProps {}
interface Props extends StateMappedToProps, DispatchMappedToProps {}

export function Login({ isLoggedIn }: Props) {
  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <h1>New Link</h1>
      <p>Enter your submission here</p>
    </div>
  )
}

function mapStateToProps(state: State) {
  return { isLoggedIn: state.auth.token !== null }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {}
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
