import React from 'react'
import { observer } from 'mobx-react'

const ApplicationList = ({list, onCancel}) => (
  <div>
    {
      list ? list.map((c, i) =>
        <div key={i}>
          {JSON.stringify(c)}
          <button onClick={() => onCancel(c.lottery_id)}>Cancel</button>
        </div>
      ) : null
    }
  </div>
)

export default observer(ApplicationList)
