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
          const urlBase = isLoggedIn ? this.store.credential.isLoggedInAsChecker ? '/checker' : '/lottery' : '/lottery/login'
          this.store.router.history.push(urlBase + (this.store.credential.isUsedByStaff ? '?staff' : ''))
        }
      }
    )
  }

  onLogin = async () => {
    const response = await authenicate(this.store.credential.secretId, this.store.credential.recaptchaResponse).catch(e => {
      this.store.credential.logout()
      return Promise.reject(e)
    })
    const json = response.data
    if ('token' in json) {
      this.store.credential.setToken(json.token)
      await this.store.fetchStatus()
      if (this.store.credential.isLoggedInAsChecker) {
        this.store.router.history.push('?staff')
      }
    } else { throw Error('Invalid response returned') }
  }

  onLogout = () => {
    this.store.credential.logout()
  }

  onQRError = (error) => {
    this.store.error.addError(101, error)
  }

  onQRScan = (scanUri) => {
    if (scanUri) {
      const secretId = extractId(scanUri)
      if (!secretId) {
        this.store.error.addError(101, 'Invalid QR Code')
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
