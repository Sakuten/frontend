import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

const ApplicationView = ({user, application, event}) => {
  const {
    onLogout,
  } = event.credential

  const {
    onChangeClassroom,
    onChangeLottery,
    onApply,
  } = event.application

  return (
    <div>
      <h1>Logged in as {user.get('username')}</h1>
      <button onClick={onLogout}>Logout</button>
      <h2>Apply</h2>
    <select name="classrooms" value={application.classroom} onChange={e => onChangeClassroom(e.target.value)}>
      {application.classroom_list.map(c =>
      <option value={c.id}>{c.grade} {c.name}</option>
    )
    }
  </select>
<select name="lotteries" onChange={e => onChangeLottery(e.target.value)}>
      {
        application.lottery_list
          .filter(c => c.classroom_id === Number(application.classroom))
          .map(c =>
            <option value={c.id}>第{c.index + 1}公演</option>
          )
      }
    </select>
    <button onClick={onApply}>Apply</button>
    </div>
  )
}

export default inject('event')(observer(ApplicationView))
