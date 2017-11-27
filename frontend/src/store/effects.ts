import { Dispatch } from 'react-redux'

import { Action } from '../store/actions'
import { RequestText, ReceiveText } from '../store/test-actions'

export function fetchText() {
  return function(dispatch: Dispatch<Action>) {
    dispatch(RequestText())

    setTimeout(() => {
      dispatch(ReceiveText(`new text ${new Date().toLocaleTimeString()}`))
    }, 2000)
  }
}
