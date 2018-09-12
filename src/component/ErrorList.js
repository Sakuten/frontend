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

const ErrorList = ({list, onDelete}) => (
  <Container data-test='errorlist'>
    {
      list.map((c, i) => {
        const error = errors[c.code]
        const levelToMessage = {
          'internal': ['is-danger', '内部エラーが発生しました'],
          'error': ['is-warning', '失敗しました'],
          'notice': ['is-info', '情報']
        }
        return (
          <article data-test='errorlist-error' className={`message ${levelToMessage[error.level][0]}`} key={i} >
            <div data-test='errorlist-error-header' className='message-header'>
              <p>{levelToMessage[error.level][1]}</p>
              <button className='delete' aria-label='delete' onClick={() => onDelete(i)} />
            </div>
            <div data-test='errorlist-error-body' className='message-body'>
              <span>
                {error.translation}
              </span>
              {error.level !== 'internal' && <button className='button is-info' onClick={() => onDelete(i)}>
                OK
              </button>}
            </div>
          </article>
        )
      })
    }
  </Container>
)

export default observer(ErrorList)
