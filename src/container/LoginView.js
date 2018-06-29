import React from 'react';
import { inject, observer } from 'mobx-react';

const LoginView = ({credential, event}) => {
  const {
    onChangeUsername,
    onChangePassword,
    onLogin,
  } = event.credential

  return (
    <div>
      <input type="text" name="username" value={credential.username} onChange={e => onChangeUsername(e.target.value)} />
      <input type="text" name="password" value={credential.password} onChange={e => onChangePassword(e.target.value)} />
      <button onClick={onLogin}>Login</button>
    </div>
  )
}

export default inject('event')(observer(LoginView))
