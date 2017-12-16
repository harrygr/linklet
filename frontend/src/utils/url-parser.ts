import { compose } from 'ramda'

function extractDomain(url: string): string {
  return compose(removeQueryString, removePort, removeSubDir, removeProtocol)(
    url,
  )
}

function removeProtocol(url: string): string {
  const protocolPos = url.indexOf('://')
  return protocolPos > -1 ? url.substr(protocolPos + 3) : url
}

function removeSubDir(url: string): string {
  return url.split('/')[0]
}

function removePort(url: string): string {
  return url.split(':')[0]
}

function removeQueryString(url: string): string {
  return url.split('?')[0]
}

export default extractDomain
