import React from 'react'
import { observer } from 'mobx-react'

import styled from 'styled-components'

const Title = styled.h3`
  font-size: 1.5rem;
  color: #000;
`

const SelectWrap = styled.div`
  margin: 10px;
`

const LotterySelect = ({list, value, classroom, onChange}) => (
  <div>
    <Title>クラス選択</Title>
    <SelectWrap className='select'>
      <select data-test='lottery-select' name='lotteries' value={value} onChange={e => onChange(e.target.value)}>
        {
          list
            .filter(c => c.classroom_id === Number(classroom))
            .map(c =>
              <option data-test='lottery-option' key={c.id} value={c.id}>第{c.index + 1}公演</option>
            )
        }
      </select>
    </SelectWrap>
  </div>
)

export default observer(LotterySelect)
