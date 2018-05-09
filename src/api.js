import axios from 'axios'
import deepAssign from 'deep-assign'

export const api_server = 'http://localhost:5000'
export function fetch_api(endpoint, options) {
  const opts = deepAssign(options, {
      url: `${api_server}/${endpoint}`,
      headers: {
        'Accept': 'application/json',
      },
      withCredentials: true}
      )
  return axios(opts)
}
