import { AxiosError } from 'axios'

export function deriveError(err: AxiosError): ApiError {
  if (!err.response) {
    return NetworkError()
  }
  if (err.response.status >= 500) {
    return ServerError(err.response.status)
  }
  if (err.response.status > 399 && err.response.status < 500) {
    return ClientError(err.response.status, err.response.data)
  }

  return UnknownError('An unknown error occurred')
}

export type ApiError = NetworkError | ServerError | ClientError | UnknownError

export interface BaseApiError {
  message: string
}

export interface NetworkError extends BaseApiError {
  type: 'network_error'
}

function NetworkError(): NetworkError {
  return {
    type: 'network_error',
    message: 'Could not connect to the network',
  }
}

export interface ServerError extends BaseApiError {
  type: 'server_error'
  status: number
}

function ServerError(status: number): ServerError {
  return {
    type: 'server_error',
    status,
    message: 'Some sort of server error occurred',
  }
}

export interface ClientError extends BaseApiError {
  type: 'client_error'
  status: number
}

function ClientError(status: number, message: string): ClientError {
  return {
    type: 'client_error',
    status,
    message,
  }
}

export interface UnknownError extends BaseApiError {
  type: 'unknown_error'
}

function UnknownError(message: string): UnknownError {
  return {
    type: 'unknown_error',
    message,
  }
}
