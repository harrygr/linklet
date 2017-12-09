import { createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import { State as UiState } from './ui/reducer'
import { State as LinksState } from './links/reducer'
import { State as AuthState } from './auth/reducer'
import { State as CommentState } from './comments/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { saveState, retrieveState } from './localStorage'
import { debounce } from 'lodash'

export interface State {
  ui: UiState
  links: LinksState
  auth: AuthState
  comments: CommentState
}

const store = createStore(
  reducer,
  retrieveState(),
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
)

store.subscribe(
  debounce(() => {
    const state = store.getState()
    if (state) {
      saveState({
        auth: state.auth,
        links: state.links,
      })
    }
  }, 1000),
)

export default store
