module.exports = () => {
  return {
    state: {
      user: 'Jimbob'
    },
    reducers: {
      setUser (state, data) {
        return {user: data}
      }
    }
  }
}
