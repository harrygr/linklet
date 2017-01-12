import * as compose from 'lodash/fp/compose'

const extractDomain = function (url: string): string {
    return compose(removeQueryString, removePort, removeSubDir, removeProtocol)(url)
}

const removeProtocol = function (url: string): string {
   const protocolPos = url.indexOf('://')
   return protocolPos > -1 ? url.substr(protocolPos + 3) : url
}

const removeSubDir = function (url: string): string {
    return url.split('/')[0]
}

const removePort = function (url: string): string {
    return url.split(':')[0]
}

const removeQueryString = function (url: string): string {
    return url.split('\?')[0]
}

export default extractDomain
