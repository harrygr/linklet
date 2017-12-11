import { Client } from './index'
import { Comment } from './types'

export default function comments({ get, destroy }: Client) {
  return {
    fetch(linkId: string | number) {
      return get<Comment[]>(`/links/${linkId}/comments`)
    },
    destroy(
      token: string,
      linkId: string | number,
      commentId: string | number,
    ) {
      return destroy<string>(`/links/${linkId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  }
}
