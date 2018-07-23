import {fetchApi} from '../request'

export const cancelLottery = (applicationId, token) => fetchApi(`applications/${applicationId}`, {
  method: 'delete',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
