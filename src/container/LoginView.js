import React from 'react'
import { inject, observer } from 'mobx-react'
import ReCAPTCHA from 'react-google-recaptcha'
import QRReader from '../component/QRReader'

const LoginView = ({credential, event}) => {
  const {
    onQRError,
    onQRScan,
    onChangeRecaptchaResponse,
    onLogin
  } = event.credential

  return (
    <div data-test='loginview'>
      {
        credential.secretId
          ? <ReCAPTCHA
            size='normal'
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            onChange={onChangeRecaptchaResponse}
          />
          : <QRReader
            onError={onQRError}
            onScan={onQRScan}
          />
      }
      <button data-test='loginview-login' onClick={onLogin}>Login</button>
    </div>
  )
}

export default inject('event')(observer(LoginView))
