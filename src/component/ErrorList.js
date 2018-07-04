import React from 'react'
import { observer } from 'mobx-react'

const ErrorList = ({list}) => (
  <div>
    {
      list.map(c =>
        <div className='notification is-danger'>
          {JSON.stringify(c)}
        </div>
      )
    }
  </div>
)

export default observer(ErrorList)
