import * as React from 'react'

import { State } from '../store/index'

import { Dispatch, connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Button, FormInput, PaddedCard, Vspace } from '../components'
import { reduxForm, SubmitHandler, Field } from 'redux-form'
import actions from '../store/actions'
import { required, emailAddress, minLength } from '../validation'

interface StateMappedToProps {
  isLoggedIn: boolean
}
interface DispatchMappedToProps {
  requestRegister: (details: Fields) => any
}
interface Props extends StateMappedToProps, DispatchMappedToProps {}

interface Fields {
  username: string
  email: string
  password: string
}

interface FormProps {
  handleSubmit: SubmitHandler<Fields, {}>
}

const passwordLength = minLength(6)

const RegisterForm = reduxForm<Fields>({
  form: 'register',
})((props: FormProps) => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Vspace>
        <Field
          component={FormInput}
          name="username"
          label="Username"
          validate={required}
        />

        <Field
          component={FormInput}
          name="email"
          label="Email"
          type="email"
          validate={[required, emailAddress]}
        />

        <Field
          component={FormInput}
          name="password"
          label="Password"
          type="password"
          validate={[required, passwordLength]}
        />

        <Button type="submit">Sign Up</Button>
      </Vspace>
    </form>
  )
})

export function Register({ requestRegister, isLoggedIn }: Props) {
  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <PaddedCard>
      <RegisterForm onSubmit={requestRegister} />
    </PaddedCard>
  )
}

function mapStateToProps(state: State) {
  return { isLoggedIn: state.auth.token !== null }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    requestRegister: (details: Fields) => dispatch(actions.register(details)),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Register)
