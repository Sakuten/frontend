import {fetchApi} from '../request'

export const cancelLottery = (lotteryId, token) => fetchApi(`lotteries/${lotteryId}/apply`, {
  method: 'delete',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
