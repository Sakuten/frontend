import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import LoginView from './container/LoginView'
import ApplicationView from './container/ApplicationView'

const App = ({store, event}) => (
  store.credential.isLoggedIn ? <ApplicationView user={store.credential.status} application={store.application} /> : <LoginView credential={store.credential} />
)

export default inject('event')(observer(App))
