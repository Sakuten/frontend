import {fetchApi} from '../request'

export const applyLottery = (lotteryId, token) => fetchApi(`api/lotteries/${lotteryId}`, {
  method: 'put',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
