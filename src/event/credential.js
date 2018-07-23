import {authenicate} from '../api/operation'

export class CredentialObject {
  constructor (store) {
    this.store = store
  }

  onLogin = async () => {
    const response = await authenicate(this.store.credential.username, this.store.credential.password)
    const json = response.data
    if ('token' in json) {
      this.store.credential.setToken(json.token)
      this.store.credential.clearPassword()
      await this.store.credential.fetchStatus()
    } else { throw Error('Invalid response returned') }
    this.store.router.history.push('/lottery')
  }

  onLogout = () => {
    this.store.credential.setToken('')
    this.store.router.history.push('/lottery/login')
  }

  onChangeUsername = (username) => {
    username = username.trim()
    this.store.credential.setUsername(username)
  }

  onChangePassword = (password) => {
    password = password.trim()
    this.store.credential.setPassword(password)
  }
}
