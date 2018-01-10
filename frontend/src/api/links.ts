import { Client } from './index'
import { Link, CreateLink } from './types'

export interface Pagination {
  page?: number
  page_size?: number
}

export const defaultPagination: Pagination = { page: 1, page_size: 10 }

export default function links({ get, post }: Client) {
  return {
    all(pagination: Pagination = defaultPagination) {
      return get<Link[]>('/links', { params: pagination })
    },
    fetch(id: string) {
      return get<Link>(`links/${id}`)
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
