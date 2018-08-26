import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const Title = styled.h3`
  font-size: 1.5rem;
  color: #000;
  margin: 10px;
`

const ClassroomSelect = ({list, value, onChange}) => (
  <div>
    <Title>クラス選択</Title>
    <div className='select'>
      <select data-test='classroom-select' name='classrooms' value={value} onChange={e => onChange(e.target.value)}>
        {
          list.map(c =>
            <option data-test='classroom-option' key={c.id} value={c.id}>{c.grade} {c.name}</option>
          )
        }
      </select>
    </div>
  </div>
)

export default observer(ClassroomSelect)
