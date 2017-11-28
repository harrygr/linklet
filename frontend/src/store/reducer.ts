import { combineReducers } from 'redux'
import linkReducer from './links/reducer'
import uiReducer from './ui/reducer'
import authReducer from './auth/reducer'

const reducer = combineReducers({
  ui: uiReducer,
  links: linkReducer,
  auth: authReducer,
})

export default reducer
