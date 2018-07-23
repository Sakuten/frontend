import { responsify } from '../../../util/responsify'

export const getClassrooms = () => new Promise((resolve, reject) => {
  resolve(responsify([
    {
      'grade': 5,
      'id': 1,
      'index': 0,
      'name': 'A'
    },
    {
      'grade': 5,
      'id': 2,
      'index': 1,
      'name': 'B'
    },
    {
      'grade': 5,
      'id': 3,
      'index': 2,
      'name': 'C'
    },
    {
      'grade': 5,
      'id': 4,
      'index': 3,
      'name': 'D'
    },
    {
      'grade': 6,
      'id': 5,
      'index': 0,
      'name': 'A'
    },
    {
      'grade': 6,
      'id': 6,
      'index': 1,
      'name': 'B'
    },
    {
      'grade': 6,
      'id': 7,
      'index': 2,
      'name': 'C'
    },
    {
      'grade': 6,
      'id': 8,
      'index': 3,
      'name': 'D'
    }
  ]))
})
