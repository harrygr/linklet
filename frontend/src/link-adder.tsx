import * as React from 'react'

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

export default LinkAdder
