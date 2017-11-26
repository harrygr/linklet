import { Action } from './actions'
import { State } from './index'

const reducer = (state: State, action: Action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_LINKS':
      return { ...state, links: action.links }
    case 'ADD_LINK':
      return { ...state, links: state.links.concat(action.link) }
    default:
      return state
  }
}

export default reducer
