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
    left
      ? <div className='tags has-addons' data-test='statustag-tags'>
        <span data-test='statustag-left' className={`tag is-dark ${className}`}>{left}</span>
        <span data-test='statustag-primary' className={`tag ${className} ${tagInfo[0]}`}>{tagInfo[1]}</span>
      </div>
      : <span data-test='statustag-primary' className={`tag ${className} ${tagInfo[0]}`}>{tagInfo[1]}</span>
  )
}

export default observer(StatusTag)
