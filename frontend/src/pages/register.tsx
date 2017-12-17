import * as React from 'react'

import { State } from '../store/index'

import { Dispatch, connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Button, Label, FormInput, PaddedCard } from '../components'
import { reduxForm, SubmitHandler } from 'redux-form'
import actions from '../store/actions'

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

const RegisterForm = reduxForm<Fields>({
  form: 'register',
})((props: FormProps) => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="username">Username</Label>
        <FormInput name="username" component="input" type="text" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <FormInput name="email" component="input" type="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <FormInput name="password" component="input" type="password" />
      </div>
      <Button type="submit">Sign Up</Button>
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
  console.log(actions)
  return {
    requestRegister: (details: Fields) => dispatch(actions.register(details)),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Register)
