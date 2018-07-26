import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import QrReader from 'react-qr-reader'

@observer class QRReader extends React.Component {
  @observable isLoading = true

  render () {
    return (
      <div>
        { this.isLoading && <p>Loading</p> }
        <div style={{display: this.isLoading ? 'none' : 'block'}} >
          <QrReader
            onError={this.props.onError}
            onScan={this.props.onScan}
            onLoad={this.onLoad}
            style={{ width: '30%' }}
          />
        </div>
      </div>
    )
  }

  @action.bound
  onLoad () {
    this.isLoading = false
  }
}

export default QRReader
