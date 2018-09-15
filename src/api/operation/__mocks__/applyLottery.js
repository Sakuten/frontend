import { responsify } from '../../../util/responsify'

export const applyLottery = (lotteryId, gropuMembers, token) => new Promise((resolve, reject) => {
  resolve(responsify({
    'id': 4,
    'lottery': {
      'classroom_id': 1,
      'done': false,
      'id': 2,
      'index': 1,
      'end_of_drawing': '09:30:00',
      'name': '5A.1',
      'winners': []
    },
    'is_rep': false,
    'status': 'pending',
    'group_members': []
  }))
})
