import React from 'react'
import { inject, observer } from 'mobx-react'

import ApplicationList from '../component/ApplicationList'
import ClassroomSelect from '../component/ClassroomSelect'
import LotterySelect from '../component/LotterySelect'

const ApplicationView = ({user, application, event}) => {
  const {
    onLogout
  } = event.credential

  const {
    onChangeClassroom,
    onChangeLottery,
    onApply,
    onCancel
  } = event.application

  return (
    <div>
      <h1 className='title'>Logged in as {user.get('username')}</h1>
      <button className='button is-danger is-outlined' onClick={onLogout}>Logout</button>
      <section className='section'>
        <h2 className='subtitle'>Apply</h2>
        <ClassroomSelect list={application.classroomList} value={application.classroom} onChange={onChangeClassroom} />
        <LotterySelect classroom={application.classroom} list={application.lotteryList} value={application.lottery} onChange={onChangeLottery} />
        <button className='button is-primary' onClick={onApply}>Apply</button>
      </section>
      <section className='section'>
        <h2 className='subtitle'>Your Applications</h2>
        <ApplicationList list={user.get('applications')} onCancel={onCancel} />
      </section>
    </div>
  )
}

export default inject('event')(observer(ApplicationView))
