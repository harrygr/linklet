import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'
import { Either, Left, Right } from 'catling'
import { deriveError, ApiError } from './errors'
import links from './links'
import comments from './comments'
import auth from './auth'
import config from '../config'
import users from './users'

export const servicesType = getReturnType(wrapClient)
export type Client = typeof servicesType

export default function api() {
  const client = wrapClient(
    axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: config.apiDomain,
    }),
  )

  return {
    links: links(client),
    auth: auth(client),
    comments: comments(client),
    users: users(client),
  }
}

function wrapClient(client: AxiosInstance) {
  return {
    get: function<T>(url: string, config?: AxiosRequestConfig) {
      return convertToResult<T>(client.get(url, config))
    },

    patch: function<T>(
      url: string,
      payload?: any,
      config?: AxiosRequestConfig,
    ) {
      return convertToResult<T>(client.patch(url, payload, config))
    },

    put: function<T>(url: string, payload?: any, config?: AxiosRequestConfig) {
      return convertToResult<T>(client.put(url, payload, config))
    },

    post: function<T>(url: string, payload?: any, config?: AxiosRequestConfig) {
      return convertToResult<T>(client.post(url, payload, config))
    },

    destroy: function<T>(url: string, config?: AxiosRequestConfig) {
      return convertToResult<T>(client.delete(url, config))
    },

    client,
  }
}

export function convertToResult<T>(
  axiosResponse: AxiosPromise,
): Promise<Either<ApiError, T>> {
  return axiosResponse
    .then(response => Right(response.data as T))
    .catch(e => Left(deriveError(e)))
}

// this hacky looking function is only used for type inference
// see http://stackoverflow.com/questions/41251531/export-return-type-of-function-in-typescript
export function getReturnType<R>(_f: (...args: any[]) => R): R {
  return null!
}
