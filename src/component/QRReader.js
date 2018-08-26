import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import QrReader from 'react-qr-reader'

const Container = styled.div`
  width: 100%;
`

@observer class QRReader extends React.Component {
  @observable isLoading = true
  @observable isLegacyMode = false

  render () {
    return (
      <Container>
        { this.isLoading && <p>Loading</p> }
        { this.isLegacyMode && <button onClick={this.onImgSubmit}>Submit an Image</button> }
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
      </Container>
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
