const form = () => ({
  username: '',
  email: '',
  password: '',
  password_confirmation: ''
})

module.exports = () => {
  return {
    namespace: 'register',

    state: {
      form: form()
    },

    reducers: {
      resetForm () {
        return {form: form()}
      },

      setField (state, {key, value}) {
        return {form: {...state.form, [key]: value}}
      }
    }
  }
}
