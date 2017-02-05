import {AxiosInstance} from 'axios'
import {Transport, AuthHeaders, DefaultHeaders} from './types'

const getAuthHeaders = (token: string): AuthHeaders => {
  return {
    'Authorization': `Bearer ${token}`,
  }
}

const getDefaultHeaders = (): DefaultHeaders => {
  return {
    'Content-Type': 'application/json',
  }
}

export default function (client: AxiosInstance): Transport {
  return {
    get ({url, token = null, headers = {}}) {
      const authHeaders = token ? getAuthHeaders(token) : {}
      const options = {
        headers: {
          ...authHeaders,
          ...headers,
        },
      }

      return client.get(url, options).then(response => response.data)
    },

    post ({url, token = null, headers = {}, data}) {
      const authHeaders = token ? getAuthHeaders(token) : {}
      const options = {
        headers: {
          ...authHeaders,
          ...headers,
        },
      }
      return client.post(url, data, options).then(response => response.data)
    },
  }
}
