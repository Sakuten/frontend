import React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'
import QRReader from '../component/QRReader'
import ClassroomSelect from '../component/ClassroomSelect'
import StatusTag from '../component/StatusTag'
import {extractId} from '../util/extractId'
import styled from 'styled-components'
import Button from '../component/Button'

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
      onChangeClassroom
    } = this.props.event.checker

    const {
      onQRError,
      onLogout
    } = this.props.event.credential

    return (
      <div data-test='checkerview'>
        <Title>チェッカー</Title>
        <ClassroomSelect list={this.props.store.application.classroomList} value={this.props.store.checker.classroom} onChange={onChangeClassroom} />
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
      this.props.event.checker.onQRScan(secretId)
    }
  }
}

export default CheckerView
