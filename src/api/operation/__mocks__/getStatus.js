import { responsify } from '../../../util/responsify'

export const getStatus = (token) => new Promise((resolve, reject) => {
  resolve(responsify({
    'application_history': [
      {
        'id': 2,
        'lottery': {
          'classroom_id': 1,
          'done': false,
          'id': 1,
          'index': 0,
          'name': '5A.0',
          'winners': []
        },
        'status': 'pending'
      }
    ],
    'id': 3,
    'username': 'example1'
  }))
})
