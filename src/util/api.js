import axios from 'axios'
import deepAssign from 'deep-assign'
import docCookies from 'doc-cookies'

export const apiServer = process.env.REACT_APP_API_SERVER
export function fetchApi (endpoint, options) {
  const server = docCookies.getItem('API_SERVER') || apiServer
  const opts = deepAssign(options, {
    url: `${server}/${endpoint}`,
    headers: {
      'Accept': 'application/json'
    },
    withCredentials: true}
  )
  return axios(opts)
}
