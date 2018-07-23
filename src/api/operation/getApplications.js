import {fetchApi} from '../request'

export const getApplications = (token) =>
  fetchApi(`applications`, {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
