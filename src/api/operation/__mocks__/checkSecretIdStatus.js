import { responsify } from '../../../util/responsify'

export const checkSecretIdStatus = (classroomId, secretId, token) => new Promise((resolve, reject) => {
  resolve(responsify({
    'status': 'pending'
  }))
})
