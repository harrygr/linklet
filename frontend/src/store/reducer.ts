import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import linkReducer from './links/reducer'
import uiReducer from './ui/reducer'
import authReducer from './auth/reducer'
import commentReducer from './comments/reducer'

const reducer = combineReducers({
  ui: uiReducer,
  links: linkReducer,
  comments: commentReducer,
  auth: authReducer,
  form: formReducer,
})

export default reducer
