import React from 'react'
import { observer } from 'mobx-react'

const LotterySelect = ({list, value, classroom, onChange}) => (
  <div>
    {
      list.length !== 0 ? list
        .filter(c => c.classroom_id === Number(classroom))
        .map(c =>
          <span data-test='lottery-lottery' key={c.id} value={c.id}>第{c.index + 1}公演</span>
        ) : <span data-test='lottery-notfound'>現在応募は受け付けておりません。</span>
    }
  </div>
)

export default observer(LotterySelect)
