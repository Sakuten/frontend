import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import ApplicationList from '../component/ApplicationList'
import GroupMemberList from '../component/GroupMemberList'
import GroupMemberButton from '../component/GroupMemberButton'
import ClassroomSelect from '../component/ClassroomSelect'
import LotterySelect from '../component/LotterySelect'
import Button from '../component/Button'

import cloud from '../cloud.svg'

const ButtonWrap = styled.button`
  margin: 20px 0;
  text-align: center;
  line-height: 2rem;
  font-size: 2rem;
  border: none;
  width: 100%;
  background-color: transparent;

  position: relative;
`

const Selection = styled.div`
  background-color: ${props => props.theme.header_color_lower};
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

const Container = styled.div`
  margin-top: 20px;
`

const Cloud = styled.div`
  position: absolute;
  width: 60vw;
  right: -20%;
  z-index: 20;
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
      <Container>
        <Cloud>
          <img src={cloud} />
        </Cloud>
        <Selection>
          <Title>クラス選択</Title>
          <Indent>
            <ClassroomSelect list={application.classroomList} value={application.classroom} onChange={onChangeClassroom} />
          </Indent>
          <Title>応募する公演</Title>
          <Indent>
            <LotterySelect classroom={application.classroom} list={application.lotteryList} value={application.lottery} onChange={onChangeLottery} />
          </Indent>
          <Title>一緒に応募する</Title>
          <Indent>
            <GroupMemberList list={application.groupMemberList} onRemove={onRemoveGroupMember} />
            <GroupMemberButton onAdd={onAddGroupMember} onError={onQRError}>他の人を追加</GroupMemberButton>
          </Indent>
        </Selection>
        <ButtonWrap onClick={onApply}>
          <Button>
            申し込む
          </Button>
        </ButtonWrap>
        <Selection>
          <Title>応募一覧</Title>
          <Indent>
            <ApplicationList list={application.applicationList} onCancel={onCancel} />
          </Indent>
        </Selection>
      </Container>
    </div>
  )
}

export default inject('event')(observer(ApplicationView))
