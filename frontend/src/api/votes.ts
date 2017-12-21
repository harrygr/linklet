import { Client } from './index'
import { CreateVote } from './types'

export default function votes({ post }: Client) {
  return {
    create(token: string, vote: CreateVote) {
      return post<CreateVote>('/votes', vote, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  }
}
