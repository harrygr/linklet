import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import { Link } from '../api/links'

export type AlertLevel = 'danger' | 'warning' | 'success' | 'none'
export interface Alert {
  message: string
  level: AlertLevel
}

export interface UiState {
  alert: Alert
  loading: boolean
}

export interface State {
  ui: UiState
  links: Record<string, Link>
  test: {
    loading: boolean
    text: string
  }
}

const state: State = {
  ui: {
    alert: { message: '', level: 'none' },
    loading: false,
  },
  links: {
    '123': {
      id: 123,
      title: 'An example link',
      url: 'http://example.com',
      inserted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  test: {
    loading: false,
    text: 'placeholder',
  },
}

const loggerMiddleware = createLogger()
const store = createStore<State>(
  reducer,
  state,
  applyMiddleware(thunkMiddleware, loggerMiddleware),
)

export default store
