import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import { State as UiState } from './ui/reducer'
import { State as LinksState } from './links/reducer'

export interface State {
  ui: UiState
  links: LinksState
}

const loggerMiddleware = createLogger()
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware),
)

export default store
