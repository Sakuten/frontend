import {fetchApi} from '../request'

export const getPublicId = (secretId, token) => fetchApi(`public_id/${secretId}`, {
  method: 'get',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
