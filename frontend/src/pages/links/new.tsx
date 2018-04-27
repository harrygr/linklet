import * as React from 'react'

import { State } from '../../store/index'

import { Dispatch, connect } from 'react-redux'
import { Redirect } from 'react-router'
import { reduxForm, SubmitHandler, Field } from 'redux-form'
import { saveLink } from '../../store/links/thunks'
import { PaddedCard, Button, FormInput, SectionHeading } from '../../components'

interface FormProps {
  handleSubmit: SubmitHandler<Fields, {}>
}

interface Fields {
  title: string
  url: string
}

const LinkForm = reduxForm<Fields>({
  form: 'link',
})((props: FormProps) => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field component={FormInput} name="title" label="Title" type="text" />

      <Field component={FormInput} name="url" label="URL" type="text" />

      <Button type="submit">Save Link</Button>
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
  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }

  return (
    <PaddedCard>
      <SectionHeading style={{ marginBottom: '20px' }}>New Link</SectionHeading>
      <LinkForm onSubmit={saveLink} />
    </PaddedCard>
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
