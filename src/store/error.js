import { observable, action } from 'mobx'
import axios from 'axios'

export class ErrorObject {
  @observable errorList = []

  constructor () {
    axios.interceptors.response.use(
      response => {
        console.log(response)
        return response
      },
      error => {
        const message = error.response ? error.response.data : (error.request ? error.request : error.message)
        this.addError(message)
        return Promise.reject(error)
      }
    )
  }

  @action.bound addError (message) {
    this.errorList.push(message)
  }
}
