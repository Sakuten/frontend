import React from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Redirect } from 'react-router'
import LoginView from './LoginView'
import ApplicationView from './ApplicationView'
import ErrorList from '../component/ErrorList'

const App = ({store, event}) => {
  const { location } = store.router
  return (
    <div location={location}>
      <Route exact path='/' render={() => <p>Hello Here is Home  <a href='/lottery/login'>Login</a></p>} />
      <Route path='/lottery/login' render={() => store.credential.isLoggedIn ? <Redirect to='/lottery' /> : <LoginView credential={store.credential} />} />
      <Route exact path='/lottery' render={() => store.credential.isLoggedIn ? <ApplicationView user={store.credential.status} application={store.application} /> : <Redirect to='/lottery/login' />} />
      <ErrorList list={store.error.errorList} />
    </div>
  )
}

export default inject('event')(observer(App))
