import { observable, action } from 'mobx'
import {fetchApi} from '../util/api'

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
    fetchApi('api/classrooms', {})
      .then(response => {
        this.setClassroomList(response.data.classrooms)
      })
  }

  @action.bound fetchLotteryList () {
    fetchApi('api/lotteries', {})
      .then(response => {
        this.setLotteryList(response.data.lotteries)
      })
  }
}
