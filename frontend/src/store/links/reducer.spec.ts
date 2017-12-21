import { vote, link } from '../../testing/factories'
import reducer, { State, Action } from './reducer'

describe('link reducer', () => {
  const v2 = vote({ link_id: 1, user_id: 33, direction: 1 })
  const v1 = vote({ link_id: 1, user_id: 99, direction: 1 })
  const l = link({ id: 1, votes: [v1, v2] })

  const state: State = { items: { '1': l }, orderedBy: 'inserted_at' }

  it("updates a link's vote belonging to a specific user", () => {
    const newState = reducer(state, Action.UpdateVote(1, 99, -1))

    const votes = newState.items['1'].votes

    expect(votes).toHaveLength(2)
    expect(votes.reduce((sum, v) => sum + v.direction, 0)).toBe(0)
  })

  it("handles trying to update a non-existant link's vote", () => {
    const newState = reducer(state, Action.UpdateVote(5, 99, -1))

    const votes = newState.items['1'].votes
    expect(Object.keys(newState.items)).toHaveLength(1)
    expect(votes).toHaveLength(2)
    expect(votes.reduce((sum, v) => sum + v.direction, 0)).toBe(2)
  })

  it('handles trying to update a non-existant vote', () => {
    const newState = reducer(state, Action.UpdateVote(1, 88, -1))

    const votes = newState.items['1'].votes

    expect(votes).toHaveLength(2)
    expect(votes.reduce((sum, v) => sum + v.direction, 0)).toBe(2)
  })
})
