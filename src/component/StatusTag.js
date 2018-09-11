import React from 'react'
import { observer } from 'mobx-react'

const StatusTag = ({status, className, left}) => {
  const tags = {
    'pending': ['is-dark', '発表をお待ちください。'],
    'won': ['is-success', '当選しました。'],
    'lose': ['is-danger', '落選しました。']
  }

  const tagInfo = tags[status] || ['', status]
  return (
    <div className='tags has-addons'>
      <span className='tag is-dark'>{left}</span>
      <span className={`tag ${tagInfo[0]}`}>{tagInfo[1]}</span>
    </div>
  )
}

export default observer(StatusTag)
