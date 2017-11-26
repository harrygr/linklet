import { createStore } from 'redux'
import reducer from './reducer'

export interface Link {
  title: string
  id: string
}

export interface State {
  links: Link[]
}

const store = createStore<State>(reducer, {
  links: [
    {
      id: 'hsajkdf',
      title: 'This is a basic link',
    },
  ],
})

export default store
