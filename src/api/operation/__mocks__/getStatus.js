import { responsify } from '../../../util/responsify'

export const getStatus = (token) => new Promise((resolve, reject) => {
  resolve(responsify({
    'status': {
      'applications': [
        {
          'id': 24,
          'lottery_id': 1,
          'status': null,
          'user_id': 3
        },
        {
          'id': 25,
          'lottery_id': 2,
          'status': null,
          'user_id': 3
        }
      ],
      'id': 3,
      'username': 'example1'
    }
  }))
})
