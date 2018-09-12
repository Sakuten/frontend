import { observable, action } from 'mobx'

export class CheckerObject {
  @observable classroom = 1
  @observable lastStatus = 'スキャンしてください'
  @observable publicId = ''

  @action.bound setClassroom (classroomId) {
    this.classroom = classroomId
  }

  @action.bound setLastStatus (status) {
    this.lastStatus = status
  }

  @action.bound setPublicId (publicId) {
    this.publicId = publicId
  }
}
