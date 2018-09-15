import { responsify } from '../../../util/responsify'

export const getClassrooms = () => new Promise((resolve, reject) => {
  resolve(responsify([
    {
      'grade': 5,
      'id': 1,
      'title': 'タイトル',
      'index': 0,
      'name': 'A'
    },
    {
      'grade': 5,
      'id': 2,
      'title': 'タイトル',
      'index': 1,
      'name': 'B'
    },
    {
      'grade': 5,
      'id': 3,
      'title': 'タイトル',
      'index': 2,
      'name': 'C'
    },
    {
      'grade': 5,
      'id': 4,
      'title': 'タイトル',
      'index': 3,
      'name': 'D'
    },
    {
      'grade': 6,
      'id': 5,
      'title': 'タイトル',
      'index': 0,
      'name': 'A'
    },
    {
      'grade': 6,
      'id': 6,
      'title': 'タイトル',
      'index': 1,
      'name': 'B'
    },
    {
      'grade': 6,
      'id': 7,
      'title': 'タイトル',
      'index': 2,
      'name': 'C'
    },
    {
      'grade': 6,
      'id': 8,
      'title': 'タイトル',
      'index': 3,
      'name': 'D'
    }
  ]))
})
