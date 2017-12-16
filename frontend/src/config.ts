import { createBrowserHistory, createMemoryHistory } from 'history'

const config = {
  apiDomain: process.env.REACT_APP_API || 'http://localhost:4000/api',
  history:
    process.env.NODE_ENV === 'testing'
      ? createMemoryHistory()
      : createBrowserHistory(),
}

export default config
