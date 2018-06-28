import {fetchApi} from '../api'

export class CredentialObject {
  constructor(store) {
    this.store = store;
  }

  login = () => {
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
        this.fetchStatus()
      } else { throw Error('Invalid response returned') }
    })
  }

  fetchStatus = () => {
    fetchApi(`api/status`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + this.store.credential.token
      }
    })
      .then(response => {
        this.store.credential.setStatus(response.data.status)
      })
      .catch(error => {
        if (error.response && error.response.data.message === 'Unauthorized') {
          this.logout()
        } else {
          throw error
        }
      })
  }

  logout = () => {
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
