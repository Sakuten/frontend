import React from 'react'
import { observer } from 'mobx-react'

const LotteryView = ({list, classroom, onChange}) => (
  <div>
    {
      classroom === null ? <span>クラスを選択してください</span> : list.length !== 0 ? list
        .filter(c => c.classroom_id === Number(classroom))
        .map(c => {
          onChange(c.id)
          return <span data-test='lottery-lottery' key={c.id} value={c.id}>第{c.index + 2}公演</span>
        }) : <span data-test='lottery-notfound'>現在応募は受け付けておりません。</span>
    }
  </div>
)

export default observer(LotteryView)
