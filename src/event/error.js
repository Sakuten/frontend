import axios from 'axios'

export class ErrorObject {
  constructor (store) {
    this.store = store

    axios.interceptors.response.use(
      response => response,
      error => {
        const message = error.response ? error.response.data : (error.request ? error.request : error.message)
        if (typeof message === 'object' && 'code' in message) {
          this.onError(message.code, message)
        } else {
          this.onError(105, message)
        }
        return Promise.reject(error)
      }
    )
  }

  onError = (code, message) => {
    if (code === 0) {
      this.store.credential.logout()
    }
    this.store.error.addError(code, message)
  }

  onDelete = (idx) => {
    this.store.error.deleteError(idx)
  }
}
