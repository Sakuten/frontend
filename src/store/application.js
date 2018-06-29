import { observable, action } from 'mobx'
import {fetchApi} from '../util/api'

export class ApplicationObject {
  @observable classroom = 1
  @observable lottery = 1

  @observable classroom_list = []
  @observable lottery_list = []

  @action.bound setClassroom (classroom_id) {
    this.classroom = classroom_id
  }

  @action.bound setLottery (lottery_id) {
    this.lottery = lottery_id
  }

  @action.bound setClassroomList (classroom_list) {
    this.classroom_list = classroom_list
  }

  @action.bound setLotteryList (lottery_list) {
    this.lottery_list = lottery_list
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
