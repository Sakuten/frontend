'use strict'

import axios from 'axios'
import deepAssign from 'deep-assign'

export const apiServer = process.env.API_SERVER
export function fetchApi (endpoint, options) {
  const opts = deepAssign(options, {
    url: `${apiServer}/${endpoint}`,
    headers: {
      'Accept': 'application/json'
    },
    withCredentials: true}
  )
  return axios(opts)
}
