import {fetchApi} from '../util/api'

export class ApplicationObject {
  constructor(store) {
    this.store = store;
    this.onUpdate()
  }

  onUpdate = async () => {
    await Promise.all([
      this.store.application.fetchClassroomList(),
      this.store.application.fetchLotteryList()
    ])
  }

  onChangeClassroom = (classroom) => {
    this.store.application.setClassroom(classroom)
  }

  onChangeLottery = (lottery) => {
    this.store.application.setLottery(lottery)
  }

  onApply = async () => {
   await fetchApi(`api/lotteries/${this.store.application.lottery}/apply`, {
      method: 'put',
      headers: {
        'Authorization': 'Bearer ' + this.store.credential.token
      }
    })
    await this.store.credential.fetchStatus()
  }

  onCancel = async (id) => {
    await fetchApi(`api/lotteries/${id}/apply`, {
      method: 'delete',
      headers: {
        'Authorization': 'Bearer ' + this.store.credential.token
      }
    })
    await this.store.credential.fetchStatus()
  }
}

