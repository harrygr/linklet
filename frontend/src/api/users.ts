import { Client } from './index'
import { User, CreateUser } from './types'

export default function users({ post }: Client) {
  return {
    create(user: CreateUser) {
      return post<User>('/users', user)
    },
  }
}
