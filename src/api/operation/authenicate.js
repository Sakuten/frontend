import {fetchApi} from '../request'

export const authenicate = (username, password) => fetchApi('auth/', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    password: password,
    username: username
  }
})
