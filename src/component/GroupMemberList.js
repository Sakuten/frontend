import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

const PublicIDWrap = styled.span`
  width: 3rem;
  font-size: 1rem;
  margin: 0 5px;
  flex-grow: 3;
`

const Container = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
`

const GroupMemberList = ({list, onRemove}) => (
  <div>
    {
      list.length !== 0 ? list.map((publicId, i) =>
        <Container data-test='groupmemberlist-member' key={i}>
          <PublicIDWrap>
            確認用ID: <b>{publicId}</b>
          </PublicIDWrap>
          <button className='button is-danger' data-test='groupmemberlist-remove' onClick={() => onRemove(i)}>削除</button>
        </Container>
      ) : <span data-test='groupmemberlist-notfound'>一緒に応募する人はいません。</span>
    }
  </div>
)

export default observer(GroupMemberList)
