import { Action } from './actions'
import { State } from './index'

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_LINKS':
      return { ...state, links: action.links }
    case 'ADD_LINK':
      return {
        ...state,
        links: { ...state.links, [action.link.id]: action.link },
      }
    case 'REQUEST_TEXT':
      const test = { ...state.test, loading: true }
      return { ...state, test }
    case 'RECEIVE_TEXT':
      return { ...state, test: { text: action.text, loading: false } }
    case 'SET_ALERT':
      return {
        ...state,
        ui: {
          ...state.ui,
          alert: { message: action.alert, level: action.level },
        },
      }
    case 'SET_LOADING':
      return { ...state, ui: { ...state.ui, loading: action.loading } }
    default:
      return state
  }
}

export default reducer
