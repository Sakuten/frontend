import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
`

const ErrorList = ({list, onDelete}) => (
  <Container data-test='errorlist'>
    {
      list.map((c, i) =>
        <article data-test='errorlist-error' className='message is-danger' key={i} >
          <div className='message-header'>
            <p>Danger</p>
            <button className='delete' aria-label='delete' onClick={() => onDelete(i)} />
          </div>
          <div className='message-body'>
            {JSON.stringify(c)}
          </div>
        </article>
      )
    }
  </Container>
)

export default observer(ErrorList)
