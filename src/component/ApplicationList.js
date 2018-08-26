import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const Tag = styled.span.attrs({
  className: 'tag'
})`
  margin: 0.75rem;
`

const ApplicationList = ({list, onCancel}) => (
  <div>
    {
      list ? list.map((c, i) =>
        <div data-test='applicationlist-application' key={i}>
          <div className='card'>
            <header className='card-header'>
              <p className='card-header-title'>
                {c.lottery.name}
              </p>
              {c.status === 'pending' ? <Tag className='is-dark'>発表をお待ちください</Tag> : c.status === 'won' ? <Tag className='is-success'>当選しました。</Tag> : <Tag className='is-danger'>落選しました。</Tag>}
            </header>
            <footer className='card-footer'>
              <a className='card-footer-item has-text-danger' data-test='applicationlist-cancel' onClick={() => onCancel(c.id)}>キャンセル</a>
            </footer>
          </div>
        </div>
      ) : null
    }
  </div>
)

export default observer(ApplicationList)
