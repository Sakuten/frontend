import { responsify } from '../../../util/responsify'

export const getApplications = (token) => new Promise((resolve, reject) => {
  resolve(responsify([
    {
      'id': 1,
      'lottery': {
        'classroom_id': 1,
        'done': false,
        'id': 1,
        'index': 0,
        'name': '5A.0',
        'end_of_drawing': '09:30:00',
        'winners': []
      },
      'is_rep': false,
      'is_member': false,
      'status': 'pending',
      'group_members': []
    }
  ]))
})
