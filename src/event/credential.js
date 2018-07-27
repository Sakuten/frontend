import {authenicate} from '../api/operation'
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
    const response = await authenicate(this.store.credential.username, this.store.credential.recaptchaResponse)
    const json = response.data
    if ('token' in json) {
      this.store.credential.setToken(json.token)
      await this.store.fetchStatus()
    } else { throw Error('Invalid response returned') }
  }

  onLogout = () => {
    this.store.credential.setToken('')
  }

  onChangeUsername = (username) => {
    username = username.trim()
    this.store.credential.setUsername(username)
  }

  onChangeRecaptchaResponse = (recaptchaResponse) => {
    this.store.credential.setRecaptchaResponse(recaptchaResponse)
  }
}
