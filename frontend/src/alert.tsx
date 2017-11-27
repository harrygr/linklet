import * as React from 'react'
import { connect } from 'react-redux'
import { State } from './store'

interface Props {
  alert: State['ui']['alert']
}

function Alert({ alert }: Props) {
  if (alert.level === 'none') {
    return <div />
  }
  return <div>{alert.message}</div>
}

function mapStateToProps(state: State) {
  return { alert: state.ui.alert }
}

export default connect(mapStateToProps)(Alert)
