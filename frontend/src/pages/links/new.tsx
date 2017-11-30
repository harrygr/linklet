import * as React from 'react'

import { State } from '../../store/index'

import { Dispatch, connect } from 'react-redux'
// import { Redirect } from 'react-router'
import { reduxForm, SubmitHandler, Field } from 'redux-form'
import { saveLink } from '../../store/effects'

interface FormProps {
  handleSubmit: SubmitHandler<Fields, {}>
}

interface Fields {
  title: string
  url: string
}

const LinkForm = reduxForm<Fields>({
  // a unique name for the form
  form: 'contact',
})((props: FormProps) => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <Field name="title" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <Field name="url" component="input" type="text" />
      </div>
      <button type="submit">Save Link</button>
    </form>
  )
})

interface StateMappedToProps {
  isLoggedIn: boolean
}
interface DispatchMappedToProps {
  saveLink: (fields: Fields) => any
}
interface Props extends StateMappedToProps, DispatchMappedToProps {}

export function Login({ isLoggedIn, saveLink }: Props) {
  // if (!isLoggedIn) {
  //   return <Redirect to="/login" />
  // }

  return (
    <div>
      <h1>New Link</h1>
      <LinkForm onSubmit={saveLink} />
    </div>
  )
}

function mapStateToProps(state: State) {
  return { isLoggedIn: state.auth.token !== null }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    saveLink: (form: Fields) => dispatch(saveLink(form)),
  }
}

export default connect<StateMappedToProps, DispatchMappedToProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
