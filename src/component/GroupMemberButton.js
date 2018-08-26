import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import {extractId} from '../util/extractId'

import QRReader from '../component/QRReader'

const Title = styled.h3`
  font-size: 1.5rem;
  color: #000;
`

@observer class GroupMemberButton extends React.Component {
  @observable isScanning = false

  render () {
    return (
      <div>
        <Title>複数人応募</Title>
        {
          this.isScanning
            ? <QRReader
              onError={this.onError}
              onScan={this.onScan}
            />
            : <button className='button' data-test='groupmemberbutton-button' onClick={this.onClick} >{this.props.children}</button>
        }
      </div>
    )
  }

  @action.bound
  onError (error) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error)
    }
  }

  @action.bound
  onScan (scanUri) {
    if (scanUri) {
      const secretId = extractId(scanUri)
      if (!secretId) {
        this.store.error.addError('Invalid QR Code')
        return
      }

      this.props.onAdd(secretId)
      this.isScanning = false
    }
  }

  @action.bound
  onClick () {
    this.isScanning = true
  }
}

export default GroupMemberButton
