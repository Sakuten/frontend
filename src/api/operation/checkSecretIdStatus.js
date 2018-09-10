import {fetchApi} from '../request'

export const checkSecretIdStatus = (classroomId, secretId, token) =>
  fetchApi(`/checker/${classroomId}/${secretId}`, {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
