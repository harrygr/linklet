export interface Link {
  id: number
  title: string
  url: string
  inserted_at: string
  updated_at: string
  user: User
  comments_count: number
}

export interface CreateLink {
  title: string
  url: string
}

export interface Comment {
  id: number
  link_id: number
  body: string
  inserted_at: string
  updated_at: string
  user: User
}

export interface User {
  username: string
  id: number
  email: string
}
