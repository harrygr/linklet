import { Client } from './index'

export interface Link {
  id: number
  title: string
  url: string
  inserted_at: string
  updated_at: string
}

export interface CreateLink {
  title: string
  url: string
}

export default function links({ get, post }: Client) {
  return {
    fetch() {
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
