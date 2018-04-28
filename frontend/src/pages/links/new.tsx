import * as React from 'react'

import { State } from '../../store/index'

import { Dispatch, connect } from 'react-redux'
import { Redirect } from 'react-router'
import { reduxForm, SubmitHandler, Field } from 'redux-form'
import { saveLink } from '../../store/links/thunks'
import {
  PaddedCard,
  Button,
  FormInput,
  SectionHeading,
  Vspace,
} from '../../components'
import { required } from '../../validation'

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
      <Vspace>
        <Field
          component={FormInput}
          name="title"
          label="Title"
          type="text"
          validate={required}
        />

        <Field
          component={FormInput}
          name="url"
          label="URL"
          type="text"
          validate={required}
        />

        <Button type="submit">Save Link</Button>
      </Vspace>
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
