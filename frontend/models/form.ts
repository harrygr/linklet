
const validate = require('validate.js')

export type FormConstructor = (namespace: string, constraints: any, defaultForm: () => any) => any

const constructor: FormConstructor = function(namespace, constraints, defaultForm) {
  const errors = makeDefaultErrors(constraints)

  return {
    namespace,
    state: {
      form: defaultForm(),
      errors,
      submitted: false,
      valid: false,
    },
    reducers: {
      validate (state) {
        const validator = validate(state.form, constraints)
        if (validator) {
          return {errors: {...errors, ...validator}, valid: false}
        }
        return {errors: errors, valid: true}
      },
      setSubmitted (state) {
        return {
          submitted: true,
        }
      },
      setField (state, {key, value}) {
        return {form: {...state.form, [key]: value}}
      },
      resetForm () {
        return {
          form: defaultForm(),
          errors: [],
          submitted: false,
        }
      },
    },
    effects: {
      setAndValidate (state, payload: any, send, done) {
        return send(`${namespace}:setField`, payload)
        .then(response => state.submitted ? send(`${namespace}:validate`) : response)
      },
    },
  }
}

export default constructor

const makeDefaultErrors = function (constraints) {
  return Object.keys(constraints).reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: [],
    }
  }, {})
}
