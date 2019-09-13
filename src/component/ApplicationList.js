import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import StatusTag from './StatusTag'

const TagWrapper = styled.span`
  margin: 0.75rem;
`

const RedText = styled.p`
  color: #ff3860;
`

const ConfirmCancel = (c, onCancel) => {
  const groupConfirm = c.group_members.length === 0 ? '' : '以下のメンバーがキャンセルされます\n' + c.group_members.map(m => m.public_id).join(', ')
  const message = '本当にキャンセルしますか？\n' + groupConfirm
  if (window.confirm(message)) {
    onCancel(c.id)
  }
}
const ApplicationList = ({list, onCancel}) => (
  <div>
    {
      list.length !== 0 ? list.map((c, i) =>
        <div data-test='applicationlist-application' key={i}>
          <div className='card'>
            <header className='card-header'>
              <p className='card-header-title'>
                {c.lottery.name.slice(0, -2)}
              </p>
              <TagWrapper>
                <StatusTag status={c.status} />
              </TagWrapper>
            </header>
            <div className='card-content'>
              <div data-test='applicationlist-body' className='content'>
                <p>第<b>{c.lottery.index + 2}</b>公演</p>
                {c.status === 'pending' && <p>抽選結果発表: <b>{c.lottery.end_of_drawing}</b></p>}
                {c.is_rep && <p>団体応募代表者です</p>}
                {c.is_member && <p>団体応募のメンバーです</p>}
                {c.group_members.length !== 0 && <div><p>一緒に応募した人: <b>{c.group_members.map(m => m.public_id).join(', ')}</b></p>
                  {c.status === 'pending' && <RedText>団体応募代表者がキャンセルすると、メンバー全員の応募がキャンセルされます。</RedText> }
                </div>}
                {c.status === 'waiting' && <RedText>キャンセル待ちは開演5分前から当選者と同じ扱いになり、先着で入場することができます。</RedText>}
                {(c.status === 'won' || c.status === 'waiting') && <RedText>6年の教室に向かう際は中央階段を使ってください。</RedText>}
              </div>
            </div>
            {c.status === 'pending' && <footer className='card-footer'>
              <a className='card-footer-item has-text-danger' data-test='applicationlist-cancel' onClick={() => ConfirmCancel(c, onCancel)}>キャンセル</a>
            </footer>}
          </div>
        </div>
      ) : <span data-test='applicationlist-notfound'>まだどのクラスにも応募していません。</span>
    }
  </div>
)

export default observer(ApplicationList)
