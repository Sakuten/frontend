import {fetchApi} from '../request'

export const checkSecretId = (classroomId, secretId, token) =>
  fetchApi(`/checker/${classroomId}/${secretId}`, {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
