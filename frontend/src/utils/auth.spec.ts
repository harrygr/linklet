import { getUserIdFromToken } from './auth'

describe('auth utils', () => {
  it('parses a valid jwt to extract the user id', () => {
    const validToken =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsaW5rbGV0IiwiZXhwIjoxNTE1NDIzMzc2LCJpYXQiOjE1MTMwMDQxNzYsImlzcyI6ImxpbmtsZXQiLCJqdGkiOiIyNDFmMjQ0YS0zZjRlLTQ2ZDItYmUzZC1iMTBiNDk5ZDVhYjQiLCJuYmYiOjE1MTMwMDQxNzUsInN1YiI6IjQiLCJ0eXAiOiJhY2Nlc3MifQ.DKofsJFe82nas7wApKo5zjhyid64qao0Qv91gy4H-W7HEWt-M8Eckxkj_6IxMJDw645JifPrYaiPyItKj6QjmA'
    const id = getUserIdFromToken(validToken)

    expect(id.get()).toBe(4)
  })

  it("returns a None if there's no sub field", () => {
    const token =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJsaW5rbGV0IiwibmJmIjoxNTEzMDA0MTc1LCJ0eXAiOiJhY2Nlc3MifQ.gE65G-C4q4J5caDK_DesryKCzg2wI99diNkoKfkS_JU'

    expect(getUserIdFromToken(token).isDefined()).toBe(false)
  })

  it('handles parsing an invalid token', () => {
    expect(getUserIdFromToken('foo').isDefined()).toBe(false)
  })
})
