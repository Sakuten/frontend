import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import ApplicationList from '../component/ApplicationList'
import GroupMemberList from '../component/GroupMemberList'
import GroupMemberButton from '../component/GroupMemberButton'
import ClassroomSelect from '../component/ClassroomSelect'
import LotteryView from '../component/LotteryView'
import Button from '../component/Button'

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
  height: 70%;
  margin: 20px;
  padding: 10px;
  border: solid 1px #dbdbdb;
`

const TopTitle = styled.h1`
  text-align: center;
  font-size: 1.7rem;
`

const EngTopTitle = styled.h1`
  text-align: center;
  font-size: 0.7rem;
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

const ApplicationView = ({credential, application, event}) => {
  const {
    onLogout,
    onQRError
  } = event.credential

  const {
    onChangeClassroom,
    onChangeLottery,
    onAddGroupMember,
    onRemoveGroupMember
  } = event.application

  const {
    onApplyLottery,
    onCancelApplication
  } = event

  return (
    <div data-test='applicationview'>
      <Container>
        <TopTitle>観覧受付</TopTitle>
        <EngTopTitle>Class selection</EngTopTitle>
        <Selection>
          <Title>クラス選択</Title>
          <Indent>
            <ClassroomSelect list={application.classroomList} value={application.classroom} onChange={onChangeClassroom} />
          </Indent>
          <Title>応募する公演</Title>
          <Indent>
            <LotteryView classroom={application.classroom} list={application.lotteryList} value={application.lottery} onChange={onChangeLottery} />
          </Indent>
          <Title>一緒に応募する</Title>
          <Indent>
            <GroupMemberList list={application.groupMemberList.map(pair => pair[1])} onRemove={onRemoveGroupMember} />
            <GroupMemberButton onAdd={onAddGroupMember} onError={onQRError} disabled={!application.isAbleToAddGroupMember}>一緒に見る人のQRコードを追加</GroupMemberButton>
          </Indent>
        </Selection>
        <ButtonWrap onClick={onApplyLottery}>
          <Button>
            申し込む
          </Button>
        </ButtonWrap>
        {
          credential.isUsedByStaff &&
          <ButtonWrap onClick={onLogout}>
            <Button>
              ログアウト
            </Button>
          </ButtonWrap>
        }
        <Selection>
          <Title>応募一覧</Title>
          <Indent>
            <ApplicationList list={application.applicationList} onCancel={onCancelApplication} />
          </Indent>
        </Selection>
      </Container>
    </div>
  )
}

export default inject('event')(observer(ApplicationView))
