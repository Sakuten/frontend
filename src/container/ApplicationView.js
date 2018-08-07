import React from 'react'
import { inject, observer } from 'mobx-react'

import ApplicationList from '../component/ApplicationList'
import GroupMemberList from '../component/GroupMemberList'
import GroupMemberButton from '../component/GroupMemberButton'
import ClassroomSelect from '../component/ClassroomSelect'
import LotterySelect from '../component/LotterySelect'

const ApplicationView = ({user, application, event}) => {
  const {
    onLogout,
    onQRError
  } = event.credential

  const {
    onChangeClassroom,
    onChangeLottery,
    onApply,
    onCancel,
    onAddGroupMember,
    onRemoveGroupMember
  } = event.application

  return (
    <div data-test='applicationview'>
      <h1 data-test='applicationview-title'>Logged in as {user.get('secret_id')}</h1>
      <button onClick={onLogout}>Logout</button>
      <h2>Apply</h2>
      <ClassroomSelect list={application.classroomList} value={application.classroom} onChange={onChangeClassroom} />
      <LotterySelect classroom={application.classroom} list={application.lotteryList} value={application.lottery} onChange={onChangeLottery} />
      <GroupMemberList list={application.groupMemberList} onRemove={onRemoveGroupMember} />
      <GroupMemberButton onAdd={onAddGroupMember} onError={onQRError} />
      <button onClick={onApply}>Apply</button>
      <h2>Your Applications</h2>
      <ApplicationList list={application.applicationList} onCancel={onCancel} />
    </div>
  )
}

export default inject('event')(observer(ApplicationView))
