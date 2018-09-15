import { observable, action } from 'mobx'

export class ErrorObject {
  @observable errorList = []
  @observable ignoreErrorCodeList = []

  @action.bound ignoring (code, proc) {
    if (Array.isArray(code)) {
      this.ignoreErrorCodeList.push(...code)
    } else {
      this.ignoreErrorCodeList.push(code)
    }
    const deleter = (arg) => {
      const del = (c) => this.ignoreErrorCodeList.splice(this.ignoreErrorCodeList.indexOf(c), 1)
      if (Array.isArray(code)) {
        code.map(c => del(c))
      } else {
        del(code)
      }
      return arg
    }
    return proc(deleter)
  }

  @action.bound addError (code, message) {
    if (this.ignoreErrorCodeList.indexOf(code) !== -1) {
      return
    }
    this.errorList.push({code: code, message: message})
  }

  @action.bound deleteError (idx) {
    this.errorList.splice(idx, 1)
  }
}
