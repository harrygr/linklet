import { tokenExpiry, isValid } from './utils'
import { format, parse } from 'date-fns'

describe('Token utilities', () => {
  // Test token set to expire at 2018-01-13 18:17:34:
  const token =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsaW5rbGV0IiwiZXhwIjoxNTE1ODY3NDU0LCJpYXQiOjE1MTM0NDgyNTQsImlzcyI6ImxpbmtsZXQiLCJqdGkiOiIxYTA2NDNjZS02ODczLTRiNDMtYWEyNi02OTUyMDg4N2Q0ZTUiLCJuYmYiOjE1MTM0NDgyNTMsInN1YiI6IjEiLCJ0eXAiOiJhY2Nlc3MifQ.aB2OvdR97UHvXeYLI9TVarDMEPlJGN0YIge6oeh3GzYmRoIxPkt8t5sJPhuK0L7y_V82EBoUCUwinJi0Zz0Fmw'

  it('gets the expiry date of a token', () => {
    const expiry = tokenExpiry(token).map(d => format(d, 'YYYY-MM-DD'))

    expect(expiry.right()).toBe('2018-01-13')
  })

  it('verifies if a token has expired', () => {
    expect(isValid(parse('2018-02-02'), token)).toBe(false)
    expect(isValid(parse('2018-01-02'), token)).toBe(true)
  })

  it('handles getting the date of an invalid token', () => {
    const invalidToken =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsaW5rbGV0IiwiZXhwZiI6MTUxNTg2NzQ1NCwiaWF0IjoxNTEzNDQ4MjU0LCJpc3MiOiJsaW5rbGV0IiwianRpIjoiMWEwNjQzY2UtNjg3My00YjQzLWFhMjYtNjk1MjA4ODdkNGU1IiwibmJmIjoxNTEzNDQ4MjUzLCJzdWIiOiIxIiwidHlwIjoiYWNjZXNzIn0.k2po9fW9lZCrR69DJDPIHxvGYrBU59Bi2479EY1Khzk'

    const expiry = tokenExpiry(invalidToken)

    expect(expiry.left()).toBe('No expiry in token')
  })
})
