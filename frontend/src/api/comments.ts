import { Client } from './index'
import { Comment } from './types'

export default function comments({ get, post }: Client) {
  return {
    fetch(linkId: string | number) {
      return get<Comment[]>(`/links/${linkId}/comments`)
    },
  }
}
