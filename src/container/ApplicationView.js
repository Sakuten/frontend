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
    <div data-test='applicationview'>
      <h1 data-test='applicationview-title'>Logged in as {user.get('username')}</h1>
      <button onClick={onLogout}>Logout</button>
      <h2>Apply</h2>
      <ClassroomSelect list={application.classroomList} value={application.classroom} onChange={onChangeClassroom} />
      <LotterySelect classroom={application.classroom} list={application.lotteryList} value={application.lottery} onChange={onChangeLottery} />
      <button onClick={onApply}>Apply</button>
      <h2>Your Applications</h2>
      <ApplicationList list={application.applicationList} onCancel={onCancel} />
    </div>
  )
}

export default inject('event')(observer(ApplicationView))
