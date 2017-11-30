import { createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import { State as UiState } from './ui/reducer'
import { State as LinksState } from './links/reducer'
import { State as AuthState } from './auth/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export interface State {
  ui: UiState
  links: LinksState
  auth: AuthState
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
)

export default store
