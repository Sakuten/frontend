import axios from 'axios'
import deepAssign from 'deep-assign'
import docCookies from 'doc-cookies'

export const apiServer = (process.env.NODE_ENV === 'development' && docCookies.getItem('API_SERVER')) || process.env.REACT_APP_API_SERVER
export function fetchApi (endpoint, options) {
  const opts = deepAssign(options, {
    baseURL: apiServer,
    url: endpoint,
    headers: {
      'Accept': 'application/json'
    },
    withCredentials: true}
  )
  return axios(opts)
}
