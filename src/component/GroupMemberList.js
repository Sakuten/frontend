import React from 'react'
import { observer } from 'mobx-react'

const GroupMemberList = ({list, onRemove}) => (
  <div>
    {
      list ? list.map((secret_id, i) =>
        <div data-test='groupmemberlist-member' key={i}>
          {secret_id}
          <button data-test='groupmemberlist-remove' onClick={() => onRemove(i)}>Remove</button>
        </div>
      ) : null
    }
  </div>
)

export default observer(GroupMemberList)
