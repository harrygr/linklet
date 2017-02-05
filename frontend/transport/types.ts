import {Promise} from 'es6-promise'

export interface DefaultHeaders {
  'Content-Type': string
}

export interface AuthHeaders {
  Authorization: string
}

export interface TransportArgs {
  url: string
  data?: any
  headers?: any
  token?: string
}

export interface Transport {
  get: (args: TransportArgs) => Promise<any>
  post: (args: TransportArgs) => Promise<any>
}
