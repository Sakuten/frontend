import React from 'react'
import { observer } from 'mobx-react'

const GroupMemberList = ({list, onRemove}) => (
  <div>
    {
      list.length !== 0 ? list.map((secretId, i) =>
        <div data-test='groupmemberlist-member' key={i}>
          {secretId}
          <button data-test='groupmemberlist-remove' onClick={() => onRemove(i)}>Remove</button>
        </div>
      ) : '一緒に応募する人はいません。'
    }
  </div>
)

export default observer(GroupMemberList)
