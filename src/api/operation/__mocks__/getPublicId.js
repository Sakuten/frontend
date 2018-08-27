import { responsify } from '../../../util/responsify'

export const getPublicId = (secretId, token) => new Promise((resolve, reject) => {
  resolve(responsify({
    'public_id': 'ABCD'
  }))
})
