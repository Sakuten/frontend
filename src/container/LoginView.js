import React from 'react'
import { inject, observer } from 'mobx-react'
import ReCAPTCHA from 'react-google-recaptcha'

const LoginView = ({credential, event}) => {
  const {
    onChangeSecretId,
    onChangeRecaptchaResponse,
    onLogin
  } = event.credential

  return (
    <div data-test='loginview'>
      <input data-test='loginview-secretId' type='text' name='secret_id' value={credential.secretId} onChange={e => onChangeSecretId(e.target.value)} />
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
