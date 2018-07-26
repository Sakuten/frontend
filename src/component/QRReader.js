import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import QrReader from 'react-qr-reader'

@observer class QRReader extends React.Component {
  @observable isLoading = true
  @observable isLegacyMode = false

  render () {
    return (
      <div>
        { this.isLoading && <p>Loading</p> }
        { this.isLegacyMode && <button onClick={this.onImgSubmit}>Submit an Image</button> }
        <div style={{display: this.isLoading ? 'none' : 'block'}} >
          { typeof global === 'undefined' &&
            <QrReader
              onError={this.onError}
              onScan={this.props.onScan}
              onLoad={this.onLoad}
              legacyMode={this.isLegacyMode}
              style={{ width: '50%' }}
              ref='reader'
            />
          }
        </div>
      </div>
    )
  }

  @action.bound
  onLoad () {
    this.isLoading = false
  }

  @action.bound
  onError (error) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error)
    }
    this.isLegacyMode = true
  }

  @action.bound
  onImgSubmit () {
    this.refs.reader.openImageDialog()
  }
}

export default QRReader
