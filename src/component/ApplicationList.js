import React from 'react'
import { observer } from 'mobx-react'

const ApplicationList = ({list, onCancel}) => (
  <div>
    {
      list ? list.map((c, i) =>
        <div data-test='applicationlist-application' key={i}>
          {JSON.stringify(c)}
          <button data-test='applicationlist-cancel' onClick={() => onCancel(c.id)}>Cancel</button>
        </div>
      ) : null
    }
  </div>
)

export default observer(ApplicationList)
