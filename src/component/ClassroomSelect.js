import React from 'react'
import { observer } from 'mobx-react'

const ClassroomSelect = ({list, value, onChange}) => (
  <div>
    {
      list.map(c =>
        <label key={1}>
          <input
            type='radio'
            name={c.id + c.grade + c.name + c.title}
            value={'c'}
            checked={false}
            onChange={this.handleRadioClick} />
          {c.grade + c.name + c.title}<br />
        </label>
      )
    }
  </div>
)

export default observer(ClassroomSelect)
