import { Client } from './index'
import { User } from './types'

export interface Credentials {
  email: string
  password: string
}

interface SuccessfulLoginResponse {
  jwt: string
  user: User
}

export default function links({ post }: Client) {
  return {
    login(creds: Credentials) {
      return post<SuccessfulLoginResponse>('/auth', creds)
    },
  }
}
