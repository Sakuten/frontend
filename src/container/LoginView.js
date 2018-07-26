import React from 'react'
import { inject, observer } from 'mobx-react'
import ReCAPTCHA from 'react-google-recaptcha'
import QrReader from 'react-qr-reader'

const LoginView = ({credential, event}) => {
  const {
    onQRError,
    onQRScan,
    onChangeRecaptchaResponse,
    onLogin
  } = event.credential

  return (
    <div data-test='loginview'>
      <QrReader
        onError={onQRError}
        onScan={onQRScan}
        style={{ width: '30%' }}
      />
      <ReCAPTCHA
        size='normal'
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
        onChange={onChangeRecaptchaResponse}
      />
      <button data-test='loginview-login' onClick={onLogin}>Login</button>
    </div>
  )
}

export default inject('event')(observer(LoginView))
