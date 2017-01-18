export default () => {
  return {
    state: {
      user: null
    },
    reducers: {
      setUser (state, data) {
        return {user: data}
      }
    }
  }
}
