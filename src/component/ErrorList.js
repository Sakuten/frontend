import React from 'react'
import { observer } from 'mobx-react'
// import styled from 'styled-components'

const ErrorList = ({list, onDelete}) => (
  <div data-test='errorlist'>
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
  </div>
)

export default observer(ErrorList)
