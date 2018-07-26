import {authenicate} from '../api/operation'

export class CredentialObject {
  constructor (store) {
    this.store = store
  }

  onLogin = async () => {
    const response = await authenicate(this.store.credential.secretId, this.store.credential.recaptchaResponse)
    const json = response.data
    if ('token' in json) {
      this.store.credential.setToken(json.token)
      await this.store.fetchStatus()
    } else { throw Error('Invalid response returned') }
  }

  onLogout = () => {
    this.store.credential.setToken('')
  }

  onChangeSecretId = (secretId) => {
    secretId = secretId.trim()
    this.store.credential.setSecretId(secretId)
  }

  onChangeRecaptchaResponse = (recaptchaResponse) => {
    recaptchaResponse = recaptchaResponse.trim()
    this.store.credential.setRecaptchaResponse(recaptchaResponse)
  }
}
