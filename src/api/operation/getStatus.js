import {fetchApi} from '../request'

export const getStatus = (token) =>
  fetchApi(`status`, {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
