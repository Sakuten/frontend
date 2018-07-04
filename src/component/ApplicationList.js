import React from 'react'
import { observer } from 'mobx-react'

const ApplicationList = ({list, onCancel}) => (
  <div>
    {
      list ? list.map(c =>
        <div className='card'>
          <header className='card-header'>
            <p className='card-header-title'>
              ID {c.id}
              <span className='m-r-sm m-l-sm'>
                {
                  c.status === null ? <span className='tag is-dark'>Pending</span>
                    : (c.status ? <span className='tag is-success'>Won</span> : <span className='tag is-warning'>Rejected</span>)
                }
              </span>
            </p>
            <a href='#' className='card-header-icon' aria-label='more options' onClick={() => onCancel(c.lottery_id)}>
              <span className='icon has-text-danger'>
                <i className='fas fa-trash' aria-hidden='true' />
              </span>
            </a>
          </header>
          <div className='card-content'>
            <div className='content'>
              {JSON.stringify(c)}
            </div>
            <footer className='card-footer'>
              <a href='#' className='card-footer-item  has-text-danger' onClick={() => onCancel(c.lottery_id)}>Cancel</a>
            </footer>
          </div>
        </div>
      ) : null
    }
  </div>
)

export default observer(ApplicationList)
