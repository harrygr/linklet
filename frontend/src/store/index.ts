import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

export interface Link {
  title: string
  id: string
}

export interface State {
  links: Link[]
  test: {
    loading: boolean
    text: string
  }
}

const state: State = {
  links: [
    {
      id: 'hsajkdf',
      title: 'This is a basic link',
    },
  ],
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
