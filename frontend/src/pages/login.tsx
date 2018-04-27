import * as React from 'react'
import { requestLogin } from '../store/auth/reducer'
import { State } from '../store/index'
import { Credentials } from '../api/auth'
import { Dispatch, connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Button, FormInput, PaddedCard, Vspace } from '../components'
import { reduxForm, SubmitHandler, Field } from 'redux-form'

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
    <form onSubmit={handleSubmit} noValidate>
      <Vspace space="cat">
        <Field component={FormInput} name="email" label="Email" type="email" />

        <Field
          component={FormInput}
          name="password"
          label="Password"
          type="password"
        />

        <Button type="submit">Login</Button>
      </Vspace>
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
