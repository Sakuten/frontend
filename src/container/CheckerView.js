import React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'
import QRReader from '../component/QRReader'
import ClassroomSelect from '../component/ClassroomSelect'
import StatusTag from '../component/StatusTag'
import {extractId} from '../util/extractId'
import styled from 'styled-components'
import Button from '../component/Button'

import {getPublicId, checkSecretIdStatus} from '../api/operation'

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

const Title = styled.h2`
  font-size: 3rem;
`

@inject('event')
@observer
class CheckerView extends React.Component {
  constructor () {
    super()
    this.lastScan = ''
  }

  render () {
    const {
      onQRError,
      onLogout
    } = this.props.event.credential

    return (
      <div data-test='checkerview'>
        <Title>チェッカー</Title>
        <ClassroomSelect list={this.props.store.application.classroomList} value={this.props.store.checker.classroom} onChange={this.onChangeClassroom} />
        <Container>
          <QRReader
            onError={onQRError}
            onScan={this.onQRScan}
          />
        </Container>
        <TagWrapper>
          <StatusTag status={this.props.store.checker.lastStatus} className='is-large' left={this.props.store.checker.publicId} />
        </TagWrapper>
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
    this.props.store.checker.setClassroom(classroom)
  }

  @action.bound
  async onQRScan (scanUri) {
    if (scanUri) {
      if (this.lastScan === scanUri) {
        return
      }
      this.lastScan = scanUri
      const secretId = extractId(scanUri)
      if (!secretId) {
        this.props.event.error.onError('Invalid QR Code')
        return
      }

      this.props.store.checker.setLastStatus('取得中')
      this.props.store.checker.setPublicId('')

      const status = await this.props.store.error.ignoring([19, 6], (callback) => {
        return checkSecretIdStatus(this.props.store.checker.classroom, secretId, this.props.store.credential.token)
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

      const resp = await getPublicId(secretId, this.props.store.credential.token)

      this.props.store.checker.setLastStatus(status)
      this.props.store.checker.setPublicId(resp.data['public_id'])
    }
  }
}

export default CheckerView
