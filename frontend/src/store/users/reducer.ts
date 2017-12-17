import { Dispatch } from 'react-redux'
import actions, { Action as AnyAction } from '../actions'
import api from '../../api/index'
import { CreateUser } from '../../api/types'

export function register(user: CreateUser) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(actions.SetLoading(true))
    ;(await api().users.create(user))
      .map(links => {
        dispatch(
          actions.requestLogin({ email: user.email, password: user.password }),
        )
      })
      .leftMap(err => {
        dispatch(actions.flashAlert(err.message, 'danger'))
      })
    dispatch(actions.SetLoading(false))
  }
}

export const Action = { register }
export interface State {}

function emptyState(): State {
  return {}
}

const reducer = (state: State = emptyState()): State => {
  return state
}

export default reducer
