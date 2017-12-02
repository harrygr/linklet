import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'
import { Result, Ok, Err } from 'space-lift'
import { deriveError, ApiError } from './errors'
import links from './links'
import comments from './comments'
import auth from './auth'

export const servicesType = getReturnType(wrapClient)
export type Client = typeof servicesType

export default function api() {
  const client = wrapClient(
    axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: `http://localhost:4000/api`,
    }),
  )

  return {
    links: links(client),
    auth: auth(client),
    comments: comments(client),
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
): Promise<Result<ApiError, T>> {
  return axiosResponse
    .then(response => Ok(response.data as T))
    .catch(e => Err(deriveError(e)))
}

// this hacky looking function is only used for type inference
// see http://stackoverflow.com/questions/41251531/export-return-type-of-function-in-typescript
export function getReturnType<R>(_f: (...args: any[]) => R): R {
  return null!
}
