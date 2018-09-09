import React from 'react'
import { inject, observer } from 'mobx-react'
import QRReader from '../component/QRReader'
import ClassroomSelect from '../component/ClassroomSelect'
import styled from 'styled-components'

import {checkSecretIdStatus} from '../api/operation'

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
  render () {
    const {
      onQRError
    } = this.props.event.credential

    return (
      <div data-test='loginview'>
        <Container>
          {
            <QRReader
              onError={onQRError}
              onScan={this.onQRScan}
            />
          }
        </Container>
      </div>
    )
  }

  @action.bound
  onQRScan (scanUri) {
    if (scanUri) {
      const secretId = extractId(scanUri)
      if (!secretId) {
        this.store.error.addError('Invalid QR Code')
        return
      }
      await checkSecretIdStatus()
    }
  }
}

export default CheckerView
