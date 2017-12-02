import { Client } from './index'
import { Link, CreateLink } from './types'

export default function links({ get, post }: Client) {
  return {
    all() {
      return get<Link[]>('/links')
    },
    create(token: string, link: CreateLink) {
      return post<Link>('/links', link, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  }
}
