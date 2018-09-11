import React from 'react'
import { inject, observer } from 'mobx-react'
import QRReader from '../component/QRReader'
import ClassroomSelect from '../component/ClassroomSelect'
import StatusTag from '../component/StatusTag'
import styled from 'styled-components'
import Button from '../component/Button'

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 90vw;
  height: 90vw;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h2`
  font-size: 3rem;
`

const CheckerView = ({store, event}) => {
  const {
    onChangeClassroom,
    onQRScan
  } = event.checker

  const {
    onQRError,
    onLogout
  } = event.credential

  return (
    <div data-test='checkerview'>
      <Title>チェッカー</Title>
      <ClassroomSelect list={store.application.classroomList} value={store.checker.classroom} onChange={onChangeClassroom} />
      <Container>
        <QRReader
          onError={onQRError}
          onScan={onQRScan}
        />
      </Container>
      <TagWrapper>
        <StatusTag status={store.checker.lastStatus} className='is-large' left={store.checker.publicId} />
      </TagWrapper>
      <button onClick={onLogout}>
        <Button>
          ログアウト
        </Button>
      </button>
    </div>
  )
}

export default inject('event')(observer(CheckerView))
