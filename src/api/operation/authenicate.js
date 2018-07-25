import {fetchApi} from '../request'

export const authenicate = (username, recaptchaResponse) => fetchApi('auth/', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    username: username,
    'g-recaptcha-response': recaptchaResponse
  }
})
