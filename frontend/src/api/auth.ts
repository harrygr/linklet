import { Client } from './index'

export interface Credentials {
  email: string
  password: string
}

interface SuccessfulLoginResponse {
  jwt: string
}

export default function links({ post }: Client) {
  return {
    login(creds: Credentials) {
      return post<SuccessfulLoginResponse>('/auth', creds)
    },
  }
}
