import * as React from 'react'
import { requestLogin } from '../store/auth/reducer'
import { State } from '../store/index'
import { Credentials } from '../api/auth'
import { Dispatch, connect } from 'react-redux'
import { Redirect } from 'react-router'

interface StateMappedToProps {
  isLoggedIn: boolean
}
interface DispatchMappedToProps {
  requestLogin: (creds: Credentials) => any
}
interface Props extends StateMappedToProps, DispatchMappedToProps {}

export function Login({ requestLogin, isLoggedIn }: Props) {
  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement

  function doLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    requestLogin({ email: emailInput.value, password: passwordInput.value })
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={doLogin}>
        <label>
          Email:
          <input type="email" ref={i => (emailInput = i!)} />
        </label>

        <label>
          Password:
          <input type="password" ref={i => (passwordInput = i!)} />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

function mapStateToProps(state: State) {
  return { isLoggedIn: state.auth.token !== null }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return { requestLogin: (creds: Credentials) => dispatch(requestLogin(creds)) }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
