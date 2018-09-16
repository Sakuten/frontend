import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import ApplicationList from '../component/ApplicationList'
import GroupMemberList from '../component/GroupMemberList'
import GroupMemberButton from '../component/GroupMemberButton'
import ClassroomSelect from '../component/ClassroomSelect'
import LotteryView from '../component/LotteryView'
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
  pointer-events: none;
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
            <LotteryView classroom={application.classroom} list={application.lotteryList} value={application.lottery} onChange={onChangeLottery} />
          </Indent>
          <Title>一緒に応募する</Title>
          <Indent>
            <GroupMemberList list={application.groupMemberList.map(pair => pair[1])} onRemove={onRemoveGroupMember} />
            <GroupMemberButton onAdd={onAddGroupMember} onError={onQRError} disabled={!application.isAbleToAddGroupMember}>他の人を追加</GroupMemberButton>
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
