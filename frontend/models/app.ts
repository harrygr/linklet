export default () => {
  return {
    state: {
      user: null
    },
    reducers: {
      noop (state) {
        return state
      },
      setUser (state, user) {
        return {user}
      }
    }
  }
}
