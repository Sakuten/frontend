import { responsify } from '../../../util/responsify'

export const getLotteries = () => new Promise((resolve, reject) => {
  resolve(responsify([
    {
      'classroom_id': 1,
      'done': false,
      'id': 1,
      'index': 0,
      'name': '5A.0'
    },
    {
      'classroom_id': 2,
      'done': false,
      'id': 5,
      'index': 0,
      'name': '5B.0'
    },
    {
      'classroom_id': 3,
      'done': false,
      'id': 9,
      'index': 0,
      'name': '5C.0'
    },
    {
      'classroom_id': 4,
      'done': false,
      'id': 13,
      'index': 0,
      'name': '5D.0'
    },
    {
      'classroom_id': 5,
      'done': false,
      'id': 17,
      'index': 0,
      'name': '6A.0'
    },
    {
      'classroom_id': 6,
      'done': false,
      'id': 21,
      'index': 0,
      'name': '6B.0'
    },
    {
      'classroom_id': 7,
      'done': false,
      'id': 25,
      'index': 0,
      'name': '6C.0'
    },
    {
      'classroom_id': 8,
      'done': false,
      'id': 29,
      'index': 0,
      'name': '6D.0'
    }
  ]))
})
