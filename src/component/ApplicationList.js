import React from 'react'
import { observer } from 'mobx-react'
import StatusTag from './StatusTag'

const ApplicationList = ({list, onCancel}) => (
  <div>
    {
      list.length !== 0 ? list.map((c, i) =>
        <div data-test='applicationlist-application' key={i}>
          <div className='card'>
            <header className='card-header'>
              <p className='card-header-title'>
                {c.lottery.name}
              </p>
              <StatusTag status={c.status} />
            </header>
            <footer className='card-footer'>
              <a className='card-footer-item has-text-danger' data-test='applicationlist-cancel' onClick={() => onCancel(c.id)}>キャンセル</a>
            </footer>
          </div>
        </div>
      ) : <span data-test='applicationlist-notfound'>まだどのクラスにも応募していません。</span>
    }
  </div>
)

export default observer(ApplicationList)
