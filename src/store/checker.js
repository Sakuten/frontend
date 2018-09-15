import { observable, action } from 'mobx'

const savedClassroom = localStorage.getItem('CheckerClassroom')

export class CheckerObject {
  @observable classroom = savedClassroom || 1
  @observable lastStatus = 'スキャンしてください'
  @observable publicId = ''

  @action.bound setClassroom (classroomId) {
    this.classroom = classroomId
    localStorage.setItem('CheckerClassroom', classroomId)
  }

  @action.bound setLastStatus (status) {
    this.lastStatus = status
  }

  @action.bound setPublicId (publicId) {
    this.publicId = publicId
  }
}
