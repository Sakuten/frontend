'use strict'

import axios from 'axios'
import deepAssign from 'deep-assign'

export const apiServer = 'http://localhost:5000'
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
