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

    // Avoid in testing
    if (this.store.router.history) { this.store.router.history.push('/lottery') }
  }

  onLogout = () => {
    this.store.credential.setToken('')

    // Avoid in testing
    if (this.store.router.history) { this.store.router.history.push('/lottery/login') }
  }

  onQRError = (error) => {
    this.store.error.addError(error)
  }

  onQRScan = (scanUri) => {
    if (scanUri) {
      const match = /^https:\/\/sakuten.jp\/lottery\/login\?sid=([a-zA-Z0-9_-]+)$/.exec(scanUri)
      if (!match) {
        this.store.error.addError('Invalid QR Code')
        return
      }

      this.store.credential.setSecretId(match[1])
      if (this.store.credential.isAbleToAuthenicate) {
        this.onLogin()
      }
    }
  }

  onChangeRecaptchaResponse = (recaptchaResponse) => {
    this.store.credential.setRecaptchaResponse(recaptchaResponse)
    if (this.store.credential.isAbleToAuthenicate) {
      this.onLogin()
    }
  }
}
