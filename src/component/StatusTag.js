import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const Tag = styled.span.attrs({
  className: 'tag'
})`
  margin: 0.75rem;
`

const StatusTag = ({status, className}) => {
  const tags = {
    'pending': <Tag className={`is-dark ${className}`}>発表をお待ちください</Tag>,
    'won': <Tag className={`is-success ${className}`}>当選しました。</Tag>,
    'lose': <Tag className={`is-danger ${className}`}>落選しました。</Tag>
  }

  return tags[status] || <Tag className={className}>{status}</Tag>
}

export default observer(StatusTag)
