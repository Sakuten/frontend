import {fetchApi} from '../request'

export const cancelLottery = (lotteryId, token) => fetchApi(`api/lotteries/${lotteryId}/apply`, {
  method: 'delete',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
