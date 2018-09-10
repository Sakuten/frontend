import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const Tag = styled.span.attrs({
  className: 'tag'
})`
  margin: 0.75rem;
`

const tags = {
  'pending': <Tag className='is-dark'>発表をお待ちください</Tag>,
  'won': <Tag className='is-success'>当選しました。</Tag>,
  'lose': <Tag className='is-danger'>落選しました。</Tag>
}

const StatusTag = ({status}) => (
  tags[status] || <Tag>{status}</Tag>
)

export default observer(StatusTag)
