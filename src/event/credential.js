import {authenicate} from '../api/operation'

export class CredentialObject {
  constructor (store) {
    this.store = store
  }

  onLogin = async () => {
    const response = await authenicate(this.store.credential.username, this.store.credential.recaptchaResponse)
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

  onChangeUsername = (username) => {
    username = username.trim()
    this.store.credential.setUsername(username)
  }

  onChangeRecaptchaResponse = (recaptchaResponse) => {
    this.store.credential.setRecaptchaResponse(recaptchaResponse)
  }
}
