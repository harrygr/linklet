import { createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import { State as UiState } from './ui/reducer'
import { State as LinksState } from './links/reducer'
import { State as AuthState } from './auth/reducer'
import { State as CommentState } from './comments/reducer'
import { State as UserState } from './users/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { saveState, retrieveState } from './local-storage'
import { debounce } from 'lodash'
import actions from './actions'

export interface State {
  ui: UiState
  links: LinksState
  auth: AuthState
  comments: CommentState
  users: UserState
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
      })
    }
  }, 1000),
)

// dispatch token check on app boot
store.dispatch(actions.CheckToken(new Date()))

export default store
