const validate = require('validate.js')

const makeDefaultErrors = (constraints) => {
  return Object.keys(constraints).reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: []
    }
  }, {})
}

const makeDefaultReducers = (defaultErrors, constraints) => {
  return {
    validate: (state) => {
      const validator = validate(state.form, constraints)
      if (validator) {
        return {errors: {...defaultErrors, ...validator}, valid: false}
      }
      return {errors: defaultErrors, valid: true}
    },
    setSubmitted (state) {
      return {
        submitted: true
      }
    },
    setField (state, {key, value}) {
      return {form: {...state.form, [key]: value}}
    }
  }
}

module.exports = ({
  model,
  constraints
}) => () => {
  const defaultErrors = makeDefaultErrors(constraints)
  const defaultReducers = {
    ...model.reducers,
    ...makeDefaultReducers(defaultErrors, constraints)
  }
  return {
    ...model,
    state: {
      ...model.state,
      submitted: false,
      errors: defaultErrors,
      valid: false
    },
    reducers: {
      ...model.state.reducers,
      ...defaultReducers
    }
  }
}



