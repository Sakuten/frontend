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
  padding: 30px;
`

const Title = styled.h3`
  font-size: 1.5rem;
  color: #000;
`

const Indent = styled.div`
  margin: 10px;
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
        <Title>クラス選択</Title>
        <Indent>
          <ClassroomSelect list={application.classroomList} value={application.classroom} onChange={onChangeClassroom} />
        </Indent>
        <Title>時間選択</Title>
        <Indent>
          <LotterySelect classroom={application.classroom} list={application.lotteryList} value={application.lottery} onChange={onChangeLottery} />
        </Indent>
        <Title>一緒に応募する</Title>
        <Indent>
          <GroupMemberList list={application.groupMemberList} onRemove={onRemoveGroupMember} />
          <GroupMemberButton onAdd={onAddGroupMember} onError={onQRError}>Add a new member</GroupMemberButton>
        </Indent>
      </Selection>
      <button onClick={onApply}>Apply</button>
      <h2>Your Applications</h2>
      <ApplicationList list={application.applicationList} onCancel={onCancel} />
    </div>
  )
}

export default inject('event')(observer(ApplicationView))
