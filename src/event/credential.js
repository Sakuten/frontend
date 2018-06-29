import {fetchApi} from '../util/api'

export class CredentialObject {
  constructor(store) {
    this.store = store;
  }

  onLogin = () => {
    fetchApi('auth/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        password: this.store.credential.password,
        username: this.store.credential.username
      }
    }).then(async (response) => {
      const json = response.data
      if ('token' in json) {
        this.store.credential.setToken(json.token)
        this.store.credential.clearPassword()
        this.store.credential.fetchStatus()
      } else { throw Error('Invalid response returned') }
    })
  }

  onLogout = () => {
    this.store.credential.setToken('')
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
