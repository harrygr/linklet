import { combineReducers } from 'redux'
import linkReducer from './links/reducer'
import uiReducer from './ui/reducer'

const reducer = combineReducers({
  ui: uiReducer,
  links: linkReducer,
})

export default reducer
