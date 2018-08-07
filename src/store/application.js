import { observable, action } from 'mobx'
import {getClassrooms, getLotteries, getApplications} from '../api/operation'

export class ApplicationObject {
  @observable classroom = 1
  @observable lottery = 1
  @observable groupMemberList = []

  @observable classroomList = []
  @observable lotteryList = []

  @observable applicationList = []

  @action.bound setClassroom (classroomId) {
    this.classroom = classroomId
  }

  @action.bound setLottery (lotteryId) {
    this.lottery = lotteryId
  }

  @action.bound addGroupMember (secret_id) {
    this.groupMemberList.push(secret_id)
  }

  @action.bound removeGroupMemberWithId (secret_id) {
    this.groupMemberList.splice(this.groupMemberList.indexOf(secret_id), 1)
  }

  @action.bound removeGroupMemberWithIdx (idx) {
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
