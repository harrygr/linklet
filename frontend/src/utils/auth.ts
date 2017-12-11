import { Option } from 'space-lift'
import * as jwtDecode from 'jwt-decode'

export function getUserIdFromToken(token: string | null): Option<number> {
  return Option(token)
    .map(jwtDecode)
    .map((claims: any) => claims.sub)
    .map(id => parseInt(id, 10))
}
