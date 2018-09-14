import React from 'react'
import { observer } from 'mobx-react'

const MessageDialog = ({title, content, buttonText, isOpen, onClose, isButtonEnabled}) => (
  <div className={`modal ${isOpen ? 'is-active' : ''}`}>
    <div onClick={onClose} className='modal-background' />
    <div className='modal-card'>
      <header className='modal-card-head'>
        <p className='modal-card-title'>{title}</p>
        <button onClick={onClose} className='delete' aria-label='close' />
      </header>
      <section className='modal-card-body'>
        {content}
      </section>
      <footer className='modal-card-foot'>
        <button disabled={!isButtonEnabled} onClick={onClose} className='button is-success'>{buttonText}</button>
      </footer>
    </div>
  </div>
)

export default observer(MessageDialog)
