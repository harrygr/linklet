import { Dispatch } from 'react-redux'

import actions, { Action } from '../../store/actions'

import api from '../../api'

import { State } from '../index'
import { CreateLink } from '../../api/types'
import { isEmpty } from 'ramda'

export function fetchLinks() {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(actions.SetLoading(true))
    ;(await api().links.all())
      .map(links => {
        dispatch(actions.SetLinks(links))
      })
      .leftMap(err => {
        dispatch(actions.flashAlert(err.message, 'danger'))
      })
    dispatch(actions.SetLoading(false))
  }
}

export function fetchLinksIfNeeded() {
  return (dispatch: Dispatch<Action>, getState: () => State) => {
    if (isEmpty(getState().links.items)) {
      dispatch(fetchLinks())
    }
  }
}

export function saveLink(link: CreateLink) {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    const state = getState()
    if (!state.auth.token) {
      dispatch(
        actions.flashAlert(
          'No auth token present. Cannot create link',
          'danger',
        ),
      )
    } else {
      dispatch(actions.SetLoading(true))
      ;(await api().links.create(state.auth.token, link))
        .map(newLink => {
          dispatch(actions.AddLink(newLink))
          dispatch(actions.flashAlert('Link Saved!', 'success'))
        })
        .leftMap(err => dispatch(actions.flashAlert(err.message, 'danger')))
      dispatch(actions.SetLoading(false))
    }
  }
}
