import * as React from 'react'
import LinkList from '../link-list'
import { connect, Dispatch } from 'react-redux'
import { State } from '../store'
import { Action } from '../store/actions'
import { fetchLinks } from '../store/effects'

interface Props {
  loadLinks: () => void
}

export function Home({ loadLinks }: Props) {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome</p>
      <button onClick={loadLinks}>Load links</button>
      <LinkList />
    </div>
  )
}

function mapStateToProps(s: State) {
  return {}
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    loadLinks: () => dispatch(fetchLinks()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
