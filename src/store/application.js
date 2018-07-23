import { observable, action } from 'mobx'
import {getClassrooms, getLotteries} from '../api/operation'

export class ApplicationObject {
  @observable classroom = 1
  @observable lottery = 1

  @observable classroomList = []
  @observable lotteryList = []

  @action.bound setClassroom (classroomId) {
    this.classroom = classroomId
  }

  @action.bound setLottery (lotteryId) {
    this.lottery = lotteryId
  }

  @action.bound setClassroomList (classroomList) {
    this.classroomList = classroomList
  }

  @action.bound setLotteryList (lotteryList) {
    this.lotteryList = lotteryList
  }

  @action.bound async fetchClassroomList () {
    const response = await getClassrooms()
    this.setClassroomList(response.data)
  }

  @action.bound async fetchLotteryList () {
    const response = await getLotteries()
    this.setLotteryList(response.data)
  }
}
