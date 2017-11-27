import { Dispatch } from 'react-redux'

import actions, { Action } from '../store/actions'
import { RequestText, ReceiveText } from '../store/test-actions'
import api from '../api'
import { AlertLevel } from './index'

export function fetchText() {
  return (dispatch: Dispatch<Action>) => {
    dispatch(RequestText())

    setTimeout(() => {
      dispatch(ReceiveText(`new text ${new Date().toLocaleTimeString()}`))
    }, 2000)
  }
}

export function fetchLinks() {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(actions.SetLoading(true))
    ;(await api().links.fetch())
      .map(links => {
        dispatch(actions.SetLinks(links))
      })
      .mapError(err => {
        dispatch(flashAlert(err.message, 'danger'))
      })
    dispatch(actions.SetLoading(false))
  }
}

export function flashAlert(alert: string, level?: AlertLevel) {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(actions.SetAlert(alert, level))
    setTimeout(() => {
      dispatch(actions.SetAlert('', 'none'))
    }, 2000)
  }
}
