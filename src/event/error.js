import axios from 'axios'

export class ErrorObject {
  constructor (store) {
    this.store = store

    axios.interceptors.response.use(
      response => response,
      error => {
        const message = error.response ? error.response.data : (error.request ? error.request : error.message)
        this.onError(message)
        return Promise.reject(error)
      }
    )
  }

  onError = (message) => {
    if ('message' in message && message['message'] === 'Unauthorized') {
      this.store.credential.setToken('')
      // Avoid in testing
      if (this.store.router.history) { this.store.router.history.push('/lottery/login') }
    }
    this.store.error.addError(message)
  }
}
