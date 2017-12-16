import { Option } from 'catling'
import * as jwtDecode from 'jwt-decode'

export function getUserIdFromToken(token: string | null): Option<number> {
  return Option(token)
    .map(t => {
      try {
        return jwtDecode(t)
      } catch {
        return undefined
      }
    })
    .map((claims: any) => claims.sub)
    .map(id => parseInt(id, 10))
}
