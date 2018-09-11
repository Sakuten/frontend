import {getPublicId, checkSecretIdStatus} from '../api/operation'

export class CheckerObject {
  constructor (store) {
    this.store = store
  }

  onChangeClassroom = (classroom) => {
    this.store.checker.setClassroom(classroom)
  }

  onCheckId = async (secretId) => {
    this.store.checker.setLastStatus('取得中')

    const status = await this.store.error.ignoring([19, 6], (callback) => {
      return checkSecretIdStatus(this.props.checker.classroom, secretId, this.store.credential.token)
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
