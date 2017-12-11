import { Dispatch } from 'react-redux'

import actions, { Action } from '../../store/actions'

import api from '../../api'
import { State } from '../index'

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

export function deleteComment(linkId: string, commentId: string) {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    const token = getState().auth.token
    if (!token) {
      dispatch(
        actions.flashAlert(
          'No auth token present. Cannot delete comment',
          'danger',
        ),
      )
    } else {
      dispatch(actions.SetLoading(true))
      ;(await api().comments.destroy(token, linkId, commentId))
        .map(response => {
          dispatch(fetchComments(linkId))
        })
        .mapError(err => dispatch(actions.flashAlert(err.message, 'danger')))
      dispatch(actions.SetLoading(false))
    }
  }
}
