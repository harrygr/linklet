import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { State } from '../store'
import { Action } from '../store/actions'
import { fetchText } from '../store/effects'

interface Props {
  text: string
  loading: boolean
  loadText: () => void
}

export function TestPage({ text, loading, loadText }: Props) {
  return (
    <div>
      <h1>Test</h1>

      <p>{loading ? 'Loading...' : `The text is "${text}"`}</p>
      <button onClick={loadText}>Load some text</button>
    </div>
  )
}

function mapStateToProps(s: State) {
  return { text: s.test.text, loading: s.test.loading }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    loadText: () => dispatch(fetchText()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage)
