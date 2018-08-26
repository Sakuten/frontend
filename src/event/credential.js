import {authenicate} from '../api/operation'
import {extractId} from '../util/extractId'
import {reaction} from 'mobx'

export class CredentialObject {
  constructor (store) {
    this.store = store

    reaction(
      () => this.store.credential.isLoggedIn,
      isLoggedIn => {
        if (this.store.router.history) {
          this.store.router.history.push(isLoggedIn ? '/lottery' : '/lottery/login')
        }
      }
    )
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

  onQRError = (error) => {
    this.store.error.addError(error)
  }

  onQRScan = (scanUri) => {
    if (scanUri) {
      const secretId = extractId(scanUri)
      if (!secretId) {
        this.store.error.addError('Invalid QR Code')
        return
      }

      this.store.credential.setSecretId(secretId)
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
