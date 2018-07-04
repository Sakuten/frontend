import React from 'react'
import { observer } from 'mobx-react'

const ClassroomSelect = ({list, value, onChange}) => (
  <div className='select'>
    <select name='classrooms' value={value} onChange={e => onChange(e.target.value)}>
      {
        list.map(c =>
          <option value={c.id}>{c.grade} {c.name}</option>
        )
      }
    </select>
  </div>
)

export default observer(ClassroomSelect)
