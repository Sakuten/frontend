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

  @action.bound fetchClassroomList () {
    getClassrooms()
      .then(response => {
        this.setClassroomList(response.data.classrooms)
      })
  }

  @action.bound fetchLotteryList () {
    getLotteries()
      .then(response => {
        this.setLotteryList(response.data.lotteries)
      })
  }
}
