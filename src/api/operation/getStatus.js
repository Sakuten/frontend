import {fetchApi} from '../request'

export const getStatus = (token) =>
  fetchApi(`api/status`, {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
