import {fetchApi} from '../api'

export class CredentialObject {
  constructor(store) {
    this.store = store.credential;
  }

  onLogin = () => {
    fetchApi('auth/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        password: this.store.password,
        username: this.store.username
      }
    }).then(async (response) => {
      const json = response.data
      if ('token' in json) {
        this.store.setToken(json.token)
        this.store.clearPassword()
        this.store.fetchStatus()
      } else { throw Error('Invalid response returned') }
    })
  }

  onLogout = () => {
    this.store.setToken('')
  }

  onChangeUsername = (username) => {
    username = username.trim()
    this.store.setUsername(username)
  }

  onChangePassword = (password) => {
    password = password.trim()
    this.store.setPassword(password)
  }
}
