import { Dispatch } from 'react-redux'
import { Credentials } from '../../api/auth'
import api from '../../api'
import { Action as UiAction } from '../ui/reducer'
import { isValid } from './utils'

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

interface CheckToken {
  type: 'CHECK_TOKEN'
  currentTime: Date
}

export function CheckToken(currentTime: Date) {
  return {
    type: 'CHECK_TOKEN',
    currentTime,
  }
}

export type Action = SetToken | CheckToken
export const Action = { SetToken, CheckToken, requestLogin }

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
    case 'CHECK_TOKEN':
      return {
        ...state,
        token:
          state.token && !isValid(action.currentTime, state.token)
            ? state.token
            : null,
      }
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
