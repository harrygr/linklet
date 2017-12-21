import { Comment, User, CurrentUser, Vote, Link } from '../api/types'

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
    ...overrides,
  }
}

export function currentUser(overrides: Partial<CurrentUser> = {}): CurrentUser {
  return {
    ...user(),
    email: 'testuser@gmail.com',
    ...overrides,
  }
}

export function vote(overrides: Partial<Vote> = {}): Vote {
  return {
    user_id: user().id,
    link_id: 1,
    direction: 1,
    ...overrides,
  }
}

export function link(overrides: Partial<Link> = {}): Link {
  return {
    id: 1,
    title: 'A link',
    url: 'http://example.com',
    votes: [
      vote({
        link_id: 1,
      }),
    ],
    user: user(),
    comments_count: 0,
    inserted_at: '2017-01-16T22:46:52.000000',
    updated_at: '2017-01-16T22:46:52.000000',
    ...overrides,
  }
}
