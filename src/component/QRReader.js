import React from 'react'
import { observer } from 'mobx-react'

import QrReader from 'react-qr-reader'

@observer class QRReader extends React.Component {
  render () {
    return (
      <div>
        <QrReader
          onError={this.props.onError}
          onScan={this.props.onScan}
          style={{ width: '30%' }}
        />
      </div>
    )
  }
}

export default QRReader
