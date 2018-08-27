import React from 'react'
import { inject, observer } from 'mobx-react'
import ReCAPTCHA from 'react-google-recaptcha'
import QRReader from '../component/QRReader'
import styled from 'styled-components'

const Container = styled.div`
  width: 90vw;
  height: 90vw;

  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginView = ({credential, event}) => {
  const {
    onQRError,
    onQRScan,
    onChangeRecaptchaResponse
  } = event.credential

  let captcha

  return (
    <div data-test='loginview'>
      <Container>
        {
          credential.secretId
            ? <ReCAPTCHA
              size='normal'
              sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
              onChange={onChangeRecaptchaResponse}
              onExpired={() => captcha.reset()}
              ref={(el) => { captcha = el }}
            />
            : <QRReader
              onError={onQRError}
              onScan={onQRScan}
            />
        }
      </Container>
    </div>
  )
}

export default inject('event')(observer(LoginView))
