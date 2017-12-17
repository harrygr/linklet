import reducer, { Action } from './reducer'

describe('Auth reducer', () => {
  // Test token set to expire at 2018-01-13 18:17:34:
  const token =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsaW5rbGV0IiwiZXhwIjoxNTE1ODY3NDU0LCJpYXQiOjE1MTM0NDgyNTQsImlzcyI6ImxpbmtsZXQiLCJqdGkiOiIxYTA2NDNjZS02ODczLTRiNDMtYWEyNi02OTUyMDg4N2Q0ZTUiLCJuYmYiOjE1MTM0NDgyNTMsInN1YiI6IjEiLCJ0eXAiOiJhY2Nlc3MifQ.aB2OvdR97UHvXeYLI9TVarDMEPlJGN0YIge6oeh3GzYmRoIxPkt8t5sJPhuK0L7y_V82EBoUCUwinJi0Zz0Fmw'

  it('checks that the token is valid', () => {
    const state = reducer(
      {
        token,
      },
      Action.CheckToken(new Date('2017-12-12')),
    )

    expect(state.token).not.toBeNull()
  })

  it('removes an expired token', () => {
    const state = reducer({ token }, Action.CheckToken(new Date('2018-02-12')))

    expect(state.token).toBeNull()
  })

  it('sets a token', () => {
    const state = reducer({ token: null }, Action.SetToken('foo'))
    expect(state.token).toBe('foo')
  })
})
