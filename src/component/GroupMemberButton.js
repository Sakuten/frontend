import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import QRReader from '../component/QRReader'

@observer class GroupMemberButton extends React.Component {
  @observable isScanning = false

  render () {
    return (
      <div>
        {
          this.isScanning
            ? <QRReader
              onError={this.onError}
              onScan={this.onScan}
            />
            : <button onClick={this.onClick} >Add member</button>
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
      const match = /\/lottery\/login\?sid=([a-zA-Z0-9_-]+)$/.exec(scanUri)
      if (!match) {
        this.store.error.addError('Invalid QR Code')
        return
      }

      this.props.onAdd(match[1])
      this.isScanning = false
    }
  }

  @action.bound
  onClick () {
    this.isScanning = true
  }
}

export default GroupMemberButton
