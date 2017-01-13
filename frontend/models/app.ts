export default () => {
  return {
    state: {
      user: null,
      transition: '',
    },
    reducers: {
      setUser (state, data) {
        return {user: data}
      },
      setTransition(state, transition) {
        return {transition}
      }
    }
  }
}
