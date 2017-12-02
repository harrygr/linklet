import { Dispatch } from 'react-redux'

import actions, { Action } from '../../store/actions'

import api from '../../api'

export function fetchComments(linkId: string) {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(actions.SetComments([]))
    dispatch(actions.SetLoading(true))
    ;(await api().comments.fetch(linkId))
      .map(comments => {
        dispatch(actions.SetComments(comments))
      })
      .mapError(err => dispatch(actions.flashAlert(err.message, 'danger')))
    dispatch(actions.SetLoading(false))
  }
}
