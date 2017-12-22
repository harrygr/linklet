import { Dispatch } from 'react-redux'
import { wait } from '../../utils/async'
import { State as GlobalState } from '../'
import { transitionTime } from '../../styles'

export type AlertLevel = 'danger' | 'warning' | 'success' | 'none'

export interface Alert {
  message: string
  level: AlertLevel
  id: number
}

interface SetAlert {
  type: 'SET_ALERT'
  alert: string
  level: AlertLevel
  id: number
}

export function SetAlert(
  alert: string,
  level: AlertLevel = 'success',
  id: number,
): SetAlert {
  return { type: 'SET_ALERT', alert, level, id }
}

interface HideAlert {
  type: 'HIDE_ALERT'
  id: number
}

export function HideAlert(id: number): HideAlert {
  return { type: 'HIDE_ALERT', id }
}

interface SetLoading {
  type: 'SET_LOADING'
  loading: boolean
}

export function SetLoading(loading: boolean): SetLoading {
  return { type: 'SET_LOADING', loading }
}

export function flashAlert(message: string, level?: AlertLevel) {
  return async (dispatch: Dispatch<Action>, getState: () => GlobalState) => {
    const currentAlert = getState().ui.alert
    const currentAlertActive = currentAlert.level !== 'none'

    if (currentAlertActive) {
      dispatch(HideAlert(currentAlert.id))
    }

    return wait(currentAlertActive ? transitionTime : 0).then(() => {
      const id = currentAlert.id + 1
      dispatch(SetAlert(message, level, id))
      return wait(2000).then(() => dispatch(HideAlert(id)))
    })
  }
}

export const Action = { SetLoading, SetAlert, HideAlert, flashAlert }
export type Action = SetAlert | SetLoading | HideAlert

export interface State {
  alert: Alert
  loading: boolean
}

function emptyState(): State {
  return { alert: { message: '', level: 'none', id: 0 }, loading: false }
}

const reducer = (state: State = emptyState(), action: Action): State => {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...state,
        alert: { message: action.alert, level: action.level, id: action.id },
      }
    case 'HIDE_ALERT': {
      if (state.alert.id !== action.id) {
        return state
      }
      return {
        ...state,
        alert: { message: '', level: 'none', id: state.alert.id },
      }
    }
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

export default reducer
