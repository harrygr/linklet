import * as React from 'react'
import { connect } from 'react-redux'
import { State } from './store'

interface Props {
  loading: boolean
}

function Loader({ loading }: Props) {
  return loading ? <div>Loading...</div> : null
}

function mapStateToProps(state: State) {
  return { loading: state.ui.loading }
}

export default connect(mapStateToProps)(Loader)
