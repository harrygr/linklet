import { Dispatch } from 'react-redux'
import { Credentials } from '../../api/auth'
import api from '../../api'
import { Action as UiAction } from '../ui/reducer'
import { isValid } from './utils'
import { User } from '../../api/types'

interface SetToken {
  type: 'SET_TOKEN'
  token: string | null
}

export function SetToken(token: string | null): SetToken {
  return { type: 'SET_TOKEN', token }
}

interface CheckToken {
  type: 'CHECK_TOKEN'
  currentTime: Date
}

export function CheckToken(currentTime: Date): CheckToken {
  return {
    type: 'CHECK_TOKEN',
    currentTime,
  }
}

interface SetUser {
  type: 'SET_USER'
  user: User | null
}

export function SetUser(user: User | null): SetUser {
  return { type: 'SET_USER', user }
}

interface Logout {
  type: 'LOGOUT'
}

export function Logout(): Logout {
  return { type: 'LOGOUT' }
}

export type Action = SetToken | CheckToken | SetUser | Logout
export const Action = { SetToken, CheckToken, SetUser, Logout, requestLogin }

export interface State {
  token: string | null
  user: User | null
}

function emptyState(): State {
  return { token: null, user: null }
}

const reducer = (state: State = emptyState(), action: Action): State => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.token }
    case 'SET_USER':
      return { ...state, user: action.user }
    case 'LOGOUT':
      return emptyState()
    case 'CHECK_TOKEN':
      return {
        ...state,
        token:
          state.token && isValid(action.currentTime, state.token)
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
        dispatch(SetUser(response.user))
        dispatch(UiAction.flashAlert('Welcome', 'success'))
      })
      .leftMap(err => {
        dispatch(UiAction.flashAlert(err.message, 'danger'))
      })
    dispatch(UiAction.SetLoading(false))
  }
}
