import React from 'react'
import { observable, action, runInAction } from 'mobx'
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
  @observable classroom = 1
  @observable lastStatus = ''
  @observable publicId = ''

  render () {
    const {
      onQRError,
      onLogout
    } = this.props.event.credential

    return (
      <div data-test='checkerview'>
        <Title>チェッカー</Title>
        <ClassroomSelect list={this.props.store.application.classroomList} value={this.classroom} onChange={this.onChangeClassroom} />
        <Container>
          <QRReader
            onError={onQRError}
            onScan={this.onQRScan}
          />
        </Container>
        <TagWrapper>
          <StatusTag status={this.lastStatus} className='is-large'>
            {this.publicId}
          </StatusTag>
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
    this.classroom = classroom
  }

  @action.bound
  async onQRScan (scanUri) {
    if (scanUri) {
      const secretId = extractId(scanUri)
      if (!secretId) {
        this.props.event.error.onError('Invalid QR Code')
        return
      }

      runInAction('updating the state', () => {
        this.lastStatus = '取得中'
        this.publicId = ''
      })

      let status
      this.props.store.error.ignoring([19, 6], () => {
        checkSecretIdStatus(this.clessroom, secretId, this.props.store.credential.token)
          .then(resp => {
            status = resp.data['status']
          })
          .catch(e => {
            const codeStatuses = {
              19: '応募していません',
              6: '時間外です'
            }
            status = codeStatuses[e.response.data.code] || JSON.stringify(e.response.data)
          })
      })

      const resp = await getPublicId(secretId, this.props.store.credential.token)

      runInAction('updating the state', () => {
        this.lastStatus = status
        this.publicId = resp.data['public_id']
      })
    }
  }
}

export default CheckerView
