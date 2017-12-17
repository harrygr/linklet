import * as decode from 'jwt-decode'
import { parse, isBefore } from 'date-fns'
import { Right, Left, Either } from 'catling'

interface Claims {
  iat: number
  exp: number
  iss: string
  sub: string
}

export function isValid(currentTime: Date, token: string): boolean {
  return tokenExpiry(token)
    .toOption()
    .map(expiry => isBefore(currentTime, expiry))
    .getOrElse(true)
}

export function tokenExpiry(token: string): Either<string, Date> {
  try {
    const claims = decode<Claims>(token)
    return claims.exp
      ? Right(parse(claims.exp * 1000))
      : Left('No expiry in token')
  } catch (e) {
    return Left(e.message)
  }
}
