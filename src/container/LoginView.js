import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

const LoginView = ({credential, event}) => {
  const {
    onChangeUsername,
    onChangePassword,
    onLogin,
  } = event.credential

  return (
    <div className="container">
      <div className="control">
        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left has-icons-right">
            <input type="text" name="username" value={credential.username} onChange={e => onChangeUsername(e.target.value)} classNameName="input" />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input type="text" name="password" value={credential.password} onChange={e => onChangePassword(e.target.value)} classNameName="input" />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <button onClick={onLogin} className="button is-primary">Login</button>
      </div>
    </div>
  )
}

export default inject('event')(observer(LoginView))
