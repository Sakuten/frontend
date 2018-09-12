import axios from 'axios'

export class ErrorObject {
  constructor (store) {
    this.store = store

    axios.interceptors.response.use(
      response => response,
      error => {
        const message = error.response ? error.response.data : (error.request ? error.request : error.message)
        this.onError(message.code, message.message)
        return Promise.reject(error)
      }
    )
  }

  onError = (code, message) => {
    if (message === 'Unauthorized') {
      this.store.credential.setToken('')
    }
    this.store.error.addError(code, message)
  }

  onDelete = (idx) => {
    this.store.error.deleteError(idx)
  }
}
