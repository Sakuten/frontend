import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

const ApplicationView = ({user, event}) => {
  const {
    onLogout,
  } = event.credential

  return (
    <div>
      <h1>Logged in as {user.get('username')}</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default inject('event')(observer(ApplicationView))
