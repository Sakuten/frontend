import {getPublicId, checkSecretIdStatus} from '../api/operation'
import {extractId} from '../util/extractId'

export class CheckerObject {
  constructor (store) {
    this.store = store
    this.lastScan = ''
  }

  onChangeClassroom = (classroom) => {
    this.store.checker.setClassroom(classroom)
  }

  onQRScan = async (scanUri) => {
    if (scanUri) {
      if (this.lastScan === scanUri) {
        return
      }
      this.lastScan = scanUri
      const secretId = extractId(scanUri)
      if (!secretId) {
        this.store.error.addError(101, 'Invalid QR Code')
        return
      }

      this.store.checker.setLastStatus('取得中')
      this.store.checker.setPublicId('')

      const status = await this.store.error.ignoring([19, 6], (callback) => {
        return checkSecretIdStatus(this.store.checker.classroom, secretId, this.store.credential.token)
          .then(resp => {
            return resp.data['status']
          })
          .catch(e => {
            const codeStatuses = {
              19: '応募していません',
              6: '時間外です'
            }
            return codeStatuses[e.response.data.code] || JSON.stringify(e.response.data)
          })
          .then(callback)
      })

      const resp = await getPublicId(secretId, this.store.credential.token)

      this.store.checker.setLastStatus(status)
      this.store.checker.setPublicId(resp.data['public_id'])
    }
  }
}
