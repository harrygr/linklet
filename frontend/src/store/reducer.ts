import { Action } from './actions'
import { State } from './index'

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_LINKS':
      return { ...state, links: action.links }
    case 'ADD_LINK':
      return { ...state, links: state.links.concat(action.link) }
    case 'REQUEST_TEXT':
      const test = { ...state.test, loading: true }
      return { ...state, test }
    case 'RECEIVE_TEXT':
      return { ...state, test: { text: action.text, loading: false } }
    default:
      return state
  }
}

export default reducer
