import React from 'react'
import { observer } from 'mobx-react'

const ClassroomSelect = ({list, value, onChange}) => (
  <div className='select'>
    <select data-test='classroom-select' name='classrooms' value={value} onChange={e => onChange(e.target.value)}>
      <option key={0} value={0}>クラスを選択してください</option>
      {
        list.map(c =>
          <option data-test='classroom-option' key={c.id} value={c.id}>{c.grade}{c.name} {c.title}</option>
        )
      }
    </select>
  </div>
)

export default observer(ClassroomSelect)
