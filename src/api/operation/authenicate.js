import {fetchApi} from '../request'

export const authenicate = (secretId, recaptchaResponse) => fetchApi('auth/', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    id: secretId,
    'g-recaptcha-response': recaptchaResponse
  }
})
