import React from 'react'
import { observer } from 'mobx-react'

const ErrorList = ({list}) => (
  <div data-test='errorlist'>
    {
      list.map(c =>
        <div data-test='errorlist-error'>
          {JSON.stringify(c)}
        </div>
      )
    }
  </div>
)

export default observer(ErrorList)
