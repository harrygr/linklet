import { Dispatch } from 'react-redux'

import actions, { Action } from '../store/actions'

import api from '../api'
import { AlertLevel } from './ui/reducer'
import { State } from './index'

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

export function fetchLinksIfNeeded() {
  return (dispatch: Dispatch<Action>, getState: () => State) => {
    if (Object.keys(getState().links.items).length === 0) {
      dispatch(fetchLinks())
    }
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
