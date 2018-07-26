import React from 'react'
import { observer } from 'mobx-react'

import QrReader from 'react-qr-reader'

const QRReader = ({onError, onScan}) => (
  <div>
    <QrReader
      onError={onError}
      onScan={onScan}
      style={{ width: '30%' }}
    />
  </div>
)

export default observer(QRReader)
