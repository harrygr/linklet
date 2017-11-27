export type AlertLevel = 'danger' | 'warning' | 'success' | 'none'

export interface Alert {
  message: string
  level: AlertLevel
}

interface SetAlert {
  type: 'SET_ALERT'
  alert: string
  level: AlertLevel
}

export function SetAlert(
  alert: string,
  level: AlertLevel = 'danger',
): SetAlert {
  return { type: 'SET_ALERT', alert, level }
}

interface SetLoading {
  type: 'SET_LOADING'
  loading: boolean
}

export function SetLoading(loading: boolean): SetLoading {
  return { type: 'SET_LOADING', loading }
}

export const Action = { SetLoading, SetAlert }
export type Action = SetAlert | SetLoading

export interface State {
  alert: Alert
  loading: boolean
}

function emptyState(): State {
  return { alert: { message: '', level: 'none' }, loading: false }
}

const reducer = (state: State = emptyState(), action: Action): State => {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...state,
        alert: { message: action.alert, level: action.level },
      }
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

export default reducer
