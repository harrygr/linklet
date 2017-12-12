import { comment } from '../../testing/factories'
import reducer, { SetComments, AddComment, RemoveComment } from './reducer'

const comment1 = comment({ id: 1, body: 'comment 1' })
const comment2 = comment({ id: 2, body: 'comment 2' })

const commentList = [comment1, comment2]
const commentObj = {
  '1': comment1,
  '2': comment2,
}

describe('Comments reducer', () => {
  it('sets an object of comments from an array', () => {
    const state = reducer(undefined, SetComments(commentList))

    expect(Object.keys(state.items)).toHaveLength(2)
    expect(state.items['1'].body).toBe('comment 1')
  })

  it('adds a comment to the state', () => {
    const state = reducer(
      { items: commentObj },
      AddComment(comment({ id: 3, body: 'comment 3' })),
    )

    expect(Object.keys(state.items)).toHaveLength(3)
    expect(state.items['3'].body).toBe('comment 3')
  })

  it('removes a comment from the state', () => {
    const state = reducer({ items: commentObj }, RemoveComment(1))

    expect(Object.keys(state.items)).toHaveLength(1)
    expect(state.items['1']).toBeUndefined()
    expect(state.items['2'].body).toBe('comment 2')
  })
})
