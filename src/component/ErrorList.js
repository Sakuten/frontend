import React from 'react'
import { observer } from 'mobx-react'

const ErrorList = ({list}) => (
  <div>
    {
      list.map((c, i) =>
        <div key={i}>
          {JSON.stringify(c)}
        </div>
      )
    }
  </div>
)

export default observer(ErrorList)
