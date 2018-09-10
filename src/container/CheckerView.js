import React from 'react'
import { observable, action, runInAction } from 'mobx'
import { inject, observer } from 'mobx-react'
import QRReader from '../component/QRReader'
import ClassroomSelect from '../component/ClassroomSelect'
import StatusTag from '../component/StatusTag'
import {extractId} from '../util/extractId'
import styled from 'styled-components'
import Button from '../component/Button'

import {checkSecretIdStatus} from '../api/operation'

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 90vw;
  height: 90vw;

  display: flex;
  justify-content: center;
  align-items: center;
`

@inject('event')
@observer
class CheckerView extends React.Component {
  @observable classroom = 1
  @observable lastStatus = ''
  @observable isModalOpen = false

  render () {
    const {
      onQRError,
      onLogout
    } = this.props.event.credential

    return (
      <div data-test='checkerview'>
        <ClassroomSelect list={this.props.store.application.classroomList} value={this.classroom} onChange={this.onChangeClassroom} />
        <Container>
          <QRReader
            onError={onQRError}
            onScan={this.onQRScan}
          />
        </Container>
        <div className={`modal ${this.isModalOpen ? 'is-active' : ''}`}>
          <div className='modal-background' />
          <div className='modal-content'>
            <TagWrapper>
              <StatusTag status={this.lastStatus} />
            </TagWrapper>
          </div>
          <button onClick={this.onCloseModal} className='modal-close is-large' aria-label='close' />
        </div>
        <button onClick={onLogout}>
          <Button>
            ログアウト
          </Button>
        </button>
      </div>
    )
  }

  @action.bound
  onChangeClassroom (classroom) {
    this.classroom = classroom
  }

  @action.bound
  onCloseModal () {
    this.isModalOpen = false
  }

  @action.bound
  async onQRScan (scanUri) {
    if (scanUri) {
      const secretId = extractId(scanUri)
      if (!secretId) {
        this.store.error.addError('Invalid QR Code')
        return
      }
      const resp = await checkSecretIdStatus(this.classroom, secretId, this.props.store.credential.token)
      runInAction('updating the state', () => {
        this.lastStatus = resp.data['status']
        this.isModalOpen = true
      })
    }
  }
}

export default CheckerView
