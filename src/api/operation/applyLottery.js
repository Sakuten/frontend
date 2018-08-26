import {fetchApi} from '../request'

export const applyLottery = (lotteryId, groupMembers, token) => fetchApi(`lotteries/${lotteryId}`, {
  method: 'post',
  headers: {
    'Authorization': 'Bearer ' + token
  },
  data: {
    group_members: groupMembers
  }
})
