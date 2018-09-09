import React from 'react'
import { observer } from 'mobx-react'

const GroupMemberList = ({list, onRemove}) => (
  <div>
    {
      list.length !== 0 ? list.map((publicId, i) =>
        <div data-test='groupmemberlist-member' key={i}>
          {publicId}
          <button data-test='groupmemberlist-remove' onClick={() => onRemove(i)}>キャンセル</button>
        </div>
      ) : <span data-test='groupmemberlist-notfound'>一緒に応募する人はいません。</span>
    }
  </div>
)

export default observer(GroupMemberList)
