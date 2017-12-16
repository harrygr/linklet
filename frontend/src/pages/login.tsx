import * as React from 'react'
import { requestLogin } from '../store/auth/reducer'
import { State } from '../store/index'
import { Credentials } from '../api/auth'
import { Dispatch, connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Button, Label, FormInput, PaddedCard } from '../components'
import { reduxForm, SubmitHandler } from 'redux-form'

interface StateMappedToProps {
  isLoggedIn: boolean
}
interface DispatchMappedToProps {
  requestLogin: (creds: Credentials) => any
}
interface Props extends StateMappedToProps, DispatchMappedToProps {}

interface Fields {
  email: string
  password: string
}

interface FormProps {
  handleSubmit: SubmitHandler<Fields, {}>
}

const LoginForm = reduxForm<Fields>({
  form: 'login',
})((props: FormProps) => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="email">Email</Label>
        <FormInput name="email" component="input" type="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <FormInput name="password" component="input" type="password" />
      </div>
      <Button type="submit">Login</Button>
    </form>
  )
})

export function Login({ requestLogin, isLoggedIn }: Props) {
  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <PaddedCard>
      <LoginForm onSubmit={requestLogin} />
    </PaddedCard>
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
