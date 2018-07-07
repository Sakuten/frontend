import {fetchApi} from '../request'

export const applyLottery = (lotteryId, token) => fetchApi(`api/lotteries/${lotteryId}/apply`, {
  method: 'put',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
