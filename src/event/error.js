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
    }
    this.store.error.addError(message)
  }

  onDelete = (idx) => {
    this.store.error.deleteError(idx)
  }
}
