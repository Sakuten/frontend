import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import ApplicationList from '../component/ApplicationList'
import GroupMemberList from '../component/GroupMemberList'
import GroupMemberButton from '../component/GroupMemberButton'
import ClassroomSelect from '../component/ClassroomSelect'
import LotterySelect from '../component/LotterySelect'

const Selection = styled.div`
  background-color: ${props => props.theme.button_color};
  width: 80vw;
  height: 70%;
`

const ApplicationView = ({user, application, event}) => {
  const {
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
      <Selection>
        <ClassroomSelect list={application.classroomList} value={application.classroom} onChange={onChangeClassroom} />
        <LotterySelect classroom={application.classroom} list={application.lotteryList} value={application.lottery} onChange={onChangeLottery} />
        <GroupMemberList list={application.groupMemberList} onRemove={onRemoveGroupMember} />
        <GroupMemberButton onAdd={onAddGroupMember} onError={onQRError}>Add a new member</GroupMemberButton>
      </Selection>
      <button onClick={onApply}>Apply</button>
      <h2>Your Applications</h2>
      <ApplicationList list={application.applicationList} onCancel={onCancel} />
    </div>
  )
}

export default inject('event')(observer(ApplicationView))
