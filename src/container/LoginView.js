import React from 'react'
import { inject, observer } from 'mobx-react'
import { ReCaptcha } from 'react-recaptcha-v3'
import QRReader from '../component/QRReader'
import styled from 'styled-components'

const Container = styled.div`
  width: 90vw;
  height: 90vw;

  display: flex;
  justify-content: center;
  align-items: center;
`

@inject('event')
@observer
class LoginView extends React.Component {
  render () {
    const {
      onQRError,
      onQRScan,
      onChangeRecaptchaResponse
    } = this.props.event.credential

    return (
      <div data-test='loginview'>
        <Container>
          {
            this.props.credential.secretId

              ? <ReCaptcha
                sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                action='login'
                verifyCallback={onChangeRecaptchaResponse}
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
}

export default LoginView
