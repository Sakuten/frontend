import React from 'react'
import { observer } from 'mobx-react'

const ErrorList = ({list}) => (
  <div>
    {
      list.map(c =>
        <div>
          {c}
        </div>
      )
    }
  </div>
)

export default observer(ErrorList)
