import { responsify } from '../../../util/responsify'

export const cancelLottery = (lotteryId, token) => new Promise((resolve, reject) => {
  resolve(responsify({'id': 24}))
})
