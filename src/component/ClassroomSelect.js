import React from 'react'
import { observer } from 'mobx-react'

const ClassroomSelect = ({list, value, onChange}) => (
  <div className='select'>
    <select data-test='classroom-select' name='classrooms' value={value} onChange={e => onChange(e.target.value)}>
      {
        list.map(c =>
          <option data-test='classroom-option' key={c.id} value={c.id}>{c.grade} {c.name}</option>
        )
      }
    </select>
  </div>
)

export default observer(ClassroomSelect)
