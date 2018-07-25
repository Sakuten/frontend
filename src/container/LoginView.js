import React from 'react'
import { inject, observer } from 'mobx-react'

const LoginView = ({credential, event}) => {
  const {
    onChangeUsername,
    onChangePassword,
    onLogin
  } = event.credential

  return (
    <div data-test='loginview'>
      <input data-test='loginview-username' type='text' name='username' value={credential.username} onChange={e => onChangeUsername(e.target.value)} />
      <input data-test='loginview-password' type='text' name='password' value={credential.password} onChange={e => onChangePassword(e.target.value)} />
      <div className='g-recaptcha' data-sitekey={process.env.REACT_APP_RECAPTCHA_KEY} />
      <button data-test='loginview-login' onClick={onLogin}>Login</button>
    </div>
  )
}

export default inject('event')(observer(LoginView))
