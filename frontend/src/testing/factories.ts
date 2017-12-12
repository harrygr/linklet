import { Comment, User } from '../api/types'

export function comment(overrides: Partial<Comment> = {}): Comment {
  return {
    id: 1,
    link_id: null,
    body: 'This is a comment',
    inserted_at: '2017-01-16T22:46:52.000000',
    updated_at: '2017-01-16T22:46:52.000000',
    user: user(),
    ...overrides,
  }
}

export function user(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    username: 'testuser',
    email: 'testuser@gmail.com',
    ...overrides,
  }
}
