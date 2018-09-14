import {CredentialObject} from './credential'
import {ApplicationObject} from './application'
import {CheckerObject} from './checker'
import {ErrorObject} from './error'
import {DialogObject} from './dialog'

import {applyLottery, cancelLottery} from '../api/operation'

export class Event {
  constructor (store) {
    this.store = store
    this.error = new ErrorObject(store)
    this.credential = new CredentialObject(store)
    this.application = new ApplicationObject(store)
    this.dialog = new DialogObject(store)
    this.checker = new CheckerObject(store)

    // This can cause network error, to be caught in ErrorObject
    // So fetchStatus() have to be placed in here
    if (this.store.credential.isLoggedIn) { this.store.fetchStatus() }
  }

  onApplyLottery = async () => {
    this.dialog.onOpen('応募しています', 'しばらくお待ちください', 'お待ちください', false)
    try {
      await applyLottery(this.store.application.lottery, this.store.application.groupMemberList.map(pair => pair[0]), this.store.credential.token)
    } catch (err) {
      this.dialog.onClose()
      throw err
    }
    this.dialog.onOpen('応募しました', '発表をお待ちください', 'OK')
    await this.store.fetchStatus()
    if (this.store.credential.isUsedByStaff) {
      this.store.credential.logout()
    }
  }

  onCancelApplication = async (id) => {
    this.dialog.onOpen('キャンセルしています', 'しばらくお待ちください', 'お待ちください', false)
    try {
      await cancelLottery(id, this.store.credential.token)
    } catch (err) {
      this.dialog.onClose()
      throw err
    }
    this.dialog.onOpen('キャンセルしました', '応募は取り消されました', 'OK')
    await this.store.fetchStatus()
    if (this.store.credential.isUsedByStaff) {
      this.store.credential.logout()
    }
  }
}
