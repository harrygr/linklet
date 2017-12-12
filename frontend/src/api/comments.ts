import { Client } from './index'
import { Comment } from './types'

export default function comments({ get, post, destroy }: Client) {
  return {
    create(token: string, linkId: string | number, body: string) {
      return post<Comment>(
        `/links/${linkId}/comments`,
        { body },
        authHeader(token),
      )
    },
    fetch(linkId: string | number) {
      return get<Comment[]>(`/links/${linkId}/comments`)
    },
    destroy(
      token: string,
      linkId: string | number,
      commentId: string | number,
    ) {
      return destroy<string>(
        `/links/${linkId}/comments/${commentId}`,
        authHeader(token),
      )
    },
  }
}

const authHeader = (token: string) => {
  return { headers: { Authorization: `Bearer ${token}` } }
}
