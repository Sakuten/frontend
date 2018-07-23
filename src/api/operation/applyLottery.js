import {fetchApi} from '../request'

export const applyLottery = (lotteryId, token) => fetchApi(`lotteries/${lotteryId}`, {
  method: 'put',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
