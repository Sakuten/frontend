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
          'internal': '内部エラーが発生しました',
          'error': 'エラーが発生しました',
          'notice': '警告'
        }
        return (
          <article data-test='errorlist-error' className='message is-danger' key={i} >
            <div data-test='errorlist-error-header' className='message-header'>
              <p>{levelToMessage[error.level]}</p>
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
