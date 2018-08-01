import {fetchApi} from '../request'

export const applyLottery = (lotteryId, token) => fetchApi(`lotteries/${lotteryId}`, {
  method: 'post',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
