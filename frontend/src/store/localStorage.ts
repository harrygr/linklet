import { State } from './index'

export function saveState(state: Partial<State>) {
  try {
    localStorage.setItem('state', JSON.stringify(state))
  } catch (error) {
    console.warn(error)
  }
}

export function retrieveState(): Partial<State> | undefined {
  try {
    const state = localStorage.getItem('state')
    if (!state) {
      return undefined
    }
    return JSON.parse(state)
  } catch (err) {
    console.warn(err)
    return undefined
  }
}
