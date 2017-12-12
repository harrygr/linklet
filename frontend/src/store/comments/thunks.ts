import { Dispatch } from 'react-redux'

import actions, { Action } from '../../store/actions'

import api from '../../api'
import { State } from '../index'
import { flashAlert } from '../ui/reducer'
import { RemoveComment } from './reducer'

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
          dispatch(RemoveComment(parseInt(commentId, 10)))
          dispatch(flashAlert('Comment deleted', 'success'))
        })
        .mapError(err => dispatch(actions.flashAlert(err.message, 'danger')))
      dispatch(actions.SetLoading(false))
    }
  }
}

export function postComment(linkId: string, body: string) {
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
      console.log(`Posting comment for ${linkId} with body: ${body}`)
      ;(await api().comments.create(token, linkId, body))
        .map(response => {
          dispatch(fetchComments(linkId))
          dispatch(flashAlert('Comment posted', 'success'))
        })
        .mapError(err => dispatch(actions.flashAlert(err.message, 'danger')))
      dispatch(actions.SetLoading(false))
    }
  }
}
