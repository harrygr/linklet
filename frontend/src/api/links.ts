import { Client } from './index'

export interface Link {
  id: number
  title: string
  url: string
  inserted_at: string
  updated_at: string
}

export default function links({ get }: Client) {
  return {
    fetch() {
      return get<Link[]>('/links')
    },
  }
}
