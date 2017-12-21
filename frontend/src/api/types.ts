export interface Link {
  id: number
  title: string
  url: string
  inserted_at: string
  updated_at: string
  user: User
  comments_count: number
  votes: Vote[]
}

export interface CreateLink {
  title: string
  url: string
}

export interface Comment {
  id: number
  link_id: number | null
  body: string
  inserted_at: string
  updated_at: string
  user: User
}

export interface CreateUser {
  username: string
  email: string
  password: string
}

export interface User {
  id: number
  username: string
}

export interface CurrentUser extends User {
  email: string
}

export interface CreateVote {
  link_id: number
  direction: 1 | 0 | -1
}

export interface Vote extends CreateVote {
  user_id: number
}
