import React from 'react'
import { inject, observer } from 'mobx-react'
import LoginView from './LoginView'
import ApplicationView from './ApplicationView'
import ErrorList from '../component/ErrorList'

const App = ({store, event}) => (
  <div>
    {store.credential.isLoggedIn ? <ApplicationView user={store.credential.status} application={store.application} /> : <LoginView credential={store.credential} />}
    <ErrorList list={store.error.errorList} />
  </div>
)

export default inject('event')(observer(App))
