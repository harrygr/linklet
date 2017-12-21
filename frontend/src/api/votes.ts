import { Client } from './index'
import { Vote } from './types'

export default function votes({ post }: Client) {
  return {
    create(token: string, vote: Vote) {
      return post<Vote>('/votes', vote, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  }
}
