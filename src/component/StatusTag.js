import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const Tag = styled.span.attrs({
  className: 'tag'
})`
  margin: 0.75rem;
`

const StatusTag = ({status}) => (
  status === 'pending' ? <Tag className='is-dark'>発表をお待ちください</Tag> : status === 'won' ? <Tag className='is-success'>当選しました。</Tag> : <Tag className='is-danger'>落選しました。</Tag>
)

export default observer(StatusTag)
