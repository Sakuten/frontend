import {fetchApi} from '../api'

export class ApplicationObject {
  constructor(store) {
    this.store = store;
    this.onUpdate()
  }

  onUpdate = async () => {
    await new Promise.all([
      this.store.fetchClassroomList(),
      this.store.fetchLotteryList()
    ])
  }

  onChangeClassroom = (classroom) => {
    this.store.setClassroom(classroom)
  }

  onChangeLottery = (lottery) => {
    this.store.setLottery(lottery)
  }
}

