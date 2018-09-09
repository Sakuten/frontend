import {getPublicId, applyLottery, cancelLottery} from '../api/operation'

export class ApplicationObject {
  constructor (store) {
    this.store = store
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

  onAddGroupMember = async (secretId) => {
    if (this.store.credential.status.get('secret_id') === secretId) {
      this.store.error.addError('You can\'t add yourself as a member')
      return
    }
    if (this.store.application.groupMemberList.indexOf(secretId) !== -1) {
      this.store.error.addError('The user is already in the member list')
      return
    }
    const resp = await getPublicId(secretId, this.store.credential.token)
    this.store.application.addGroupMember(secretId, resp.data['public_id'])
  }

  onRemoveGroupMember = (idx) => {
    this.store.application.removeGroupMemberByIdx(idx)
  }

  onApply = async () => {
    await applyLottery(this.store.application.lottery, this.store.application.groupMemberList.map(pair => pair[0]), this.store.credential.token)
    await this.store.fetchStatus()
  }

  onCancel = async (id) => {
    await cancelLottery(id, this.store.credential.token)
    await this.store.fetchStatus()
  }
}
