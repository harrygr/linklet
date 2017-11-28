import { Dispatch } from 'react-redux'

import actions, { Action } from '../store/actions'

import api from '../api'

import { State } from './index'

export function fetchLinks() {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(actions.SetLoading(true))
    ;(await api().links.fetch())
      .map(links => {
        dispatch(actions.SetLinks(links))
      })
      .mapError(err => {
        dispatch(actions.flashAlert(err.message, 'danger'))
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
