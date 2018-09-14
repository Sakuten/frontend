import React from 'react'
import { observer } from 'mobx-react'

const MessageDialog = ({title, children, buttonText, isOpen, onClose, isButtonEnabled}) => (
  <div data-test='messagedialog' className={`modal ${isOpen ? 'is-active' : ''}`}>
    <div onClick={onClose} className='modal-background' />
    <div className='modal-card'>
      <header className='modal-card-head'>
        <p data-test='messagedialog-title' className='modal-card-title'>{title}</p>
        <button onClick={onClose} className='delete' aria-label='close' />
      </header>
      <section data-test='messagedialog-body' className='modal-card-body'>
        {children}
      </section>
      <footer className='modal-card-foot'>
        <button data-test='messagedialog-button' disabled={!isButtonEnabled} onClick={onClose} className='button is-success'>{buttonText}</button>
      </footer>
    </div>
  </div>
)

export default observer(MessageDialog)
