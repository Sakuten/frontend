import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import errors from '../errors.json'

const Container = styled.div`
  position: fixed;
  bottom: 5%;
  width: 90vw;
  z-index: 10;
`

const MessageContainer = styled.div.attrs({
  className: 'message-body'
})`
  display: flex;
`

const MessageBody = styled.span`
  flex-grow: 1;
`

const ErrorList = ({list, onDelete, onShowDetails}) => (
  <Container data-test='errorlist'>
    {
      list.map((c, i) => {
        const error = errors[c.code] || {'translation': '前回当選したので、今回は応募できません。', 'level': 'notice'}
        const levelToMessage = {
          'internal': ['is-danger', '内部エラーが発生しました'],
          'error': ['is-warning', '失敗しました'],
          'notice': ['is-info', '情報']
        }
        const msg = levelToMessage[error.level]
        return (
          <article data-test='errorlist-error' className={`message ${msg[0]}`} key={i} >
            <div data-test='errorlist-error-header' className='message-header'>
              <p>{msg[1]}</p>
              <button data-test='errorlist-error-close-button' className='delete' aria-label='delete' onClick={() => onDelete(i)} />
            </div>
            <MessageContainer className='message-body'>
              <MessageBody data-test='errorlist-error-body'>
                {error.translation}
              </MessageBody>
              <button data-test='errorlist-error-detail-button' className='button is-light' onClick={() => onShowDetails(c.message)}>
                詳細
              </button>
              {error.level !== 'internal' && <button data-test='errorlist-error-ok-button' className='button is-info' onClick={() => onDelete(i)}>
                OK
              </button>}
            </MessageContainer>
          </article>
        )
      })
    }
  </Container>
)

export default observer(ErrorList)
