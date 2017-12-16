import { Dispatch } from 'react-redux'
import { Credentials } from '../../api/auth'
import api from '../../api'
import { Action as UiAction } from '../ui/reducer'

interface SetToken {
  type: 'SET_TOKEN'
  token: string
}

export function SetToken(token: string | null) {
  return {
    type: 'SET_TOKEN',
    token,
  }
}

export type Action = SetToken
export const Action = { SetToken }

export interface State {
  token: string | null
}

function emptyState(): State {
  return { token: null }
}

const reducer = (state: State = emptyState(), action: Action): State => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.token }
    default:
      return state
  }
}

export default reducer

export function requestLogin(creds: Credentials) {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(UiAction.SetLoading(true))
    ;(await api().auth.login(creds))
      .map(response => {
        dispatch(SetToken(response.jwt))
        dispatch(UiAction.flashAlert('welcome', 'success'))
      })
      .leftMap(err => {
        dispatch(UiAction.flashAlert(err.message, 'danger'))
      })
    dispatch(UiAction.SetLoading(false))
  }
}
