import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action, AddLink } from './store/actions'

interface Props {
  addLink: (link: string) => void
}

function LinkAdder({ addLink }: Props) {
  let input: HTMLInputElement

  const submitLink = () => {
    addLink(input.value)
    input.value = ''
  }
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        submitLink()
      }}
    >
      <label>Add link</label>
      <input type="text" ref={i => (input = i || input)} />
      <button type="submit">Add</button>
    </form>
  )
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    addLink: (link: string) => dispatch(AddLink(link)),
  }
}

export default connect(() => ({}), mapDispatchToProps)(LinkAdder)
