const protocol = location.protocol
const slashes = protocol.concat('//')
const hostname = window.location.hostname
const port = window.location.port

export const apiHost = hostname === 'localhost' ||
  !['80', '443', ''].includes(port)
  ? slashes.concat(`${window.location.hostname}:8080`)
  : slashes.concat(window.location.hostname)

export const host = hostname === 'localhost'
  ? slashes.concat(`${window.location.hostname}:3000`)
  : slashes.concat(window.location.hostname)

export const API_URL = `${apiHost}/api/v1/`
export const GOOGLE_MAPS_API_KEY = 'AIzaSyDGzfDHQ0FkzxpTC04zi60ItnfEn55Ya0U'
