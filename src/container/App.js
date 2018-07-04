import React from 'react'
import { inject, observer } from 'mobx-react'
import LoginView from './LoginView'
import ApplicationView from './ApplicationView'
import ErrorList from '../component/ErrorList'

const App = ({store, event}) => (
  <div>
    <section className='section'>
      <div className='container'>
        {store.credential.isLoggedIn ? <ApplicationView user={store.credential.status} application={store.application} /> : <LoginView credential={store.credential} />}
      </div>
    </section>
    <section className='section'>
      <ErrorList list={store.error.errorList} />
    </section>
  </div>
)

export default inject('event')(observer(App))
