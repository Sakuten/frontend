import { observable, computed, action } from 'mobx'
import {getClassrooms, getLotteries, getApplications} from '../api/operation'

export class ApplicationObject {
  @observable classroom = 1
  @observable lottery = 1
  @observable groupMemberList = []

  @observable classroomList = []
  @observable lotteryList = []

  @observable applicationList = []

  @computed get isAbleToAddGroupMember () {
    return this.groupMemberList.length < 3
  }

  @action.bound clearInputs () {
    this.classroom = 1
    this.lottery = 1
    this.groupMemberList = []
  }

  @action.bound setClassroom (classroomId) {
    this.classroom = classroomId
  }

  @action.bound setLottery (lotteryId) {
    this.lottery = lotteryId
  }

  @action.bound addGroupMember (secretId, publicId) {
    this.groupMemberList.push([secretId, publicId])
  }

  @action.bound removeGroupMemberById (secretId, publicId) {
    const idx = this.groupMemberList.indexOf([secretId, publicId])
    this.removeGroupMemberByIdx(idx)
  }

  @action.bound removeGroupMemberByIdx (idx) {
    this.groupMemberList.splice(idx, 1)
  }

  @action.bound setClassroomList (classroomList) {
    this.classroomList = classroomList
  }

  @action.bound setLotteryList (lotteryList) {
    this.lotteryList = lotteryList
  }

  @action.bound setApplicationList (applicationList) {
    this.applicationList = applicationList
  }

  @action.bound async fetchClassroomList () {
    const response = await getClassrooms()
    this.setClassroomList(response.data)
  }

  @action.bound async fetchLotteryList () {
    const response = await getLotteries()
    this.setLotteryList(response.data)
  }

  @action.bound async fetchApplicationList (token) {
    const response = await getApplications(token)
    this.setApplicationList(response.data)
  }
}
