import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import FullWidth from '../util/fullwidth.js'

import QrReader from 'react-qr-reader'

@observer class QRReader extends React.Component {
  @observable isLoading = true
  @observable isLegacyMode = false

  render () {
    return (
      <FullWidth>
        { this.isLoading && <p>Loading</p> }
        { this.isLegacyMode && <button className='button' onClick={this.onImgSubmit}>QRコードの画像を選択する</button> }
        <div style={{display: this.isLoading ? 'none' : 'block'}} >
          { window.navigator.userAgent.indexOf('jsdom') === -1 &&
            <QrReader
              onError={this.onError}
              onScan={this.props.onScan}
              onLoad={this.onLoad}
              legacyMode={this.isLegacyMode}
              ref='reader'
            />
          }
        </div>
      </FullWidth>
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
