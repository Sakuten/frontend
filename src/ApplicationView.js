import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

const ApplicationView = ({user, application, event}) => {
  const {
    onLogout,
  } = event.credential

  const {
    onChangeClassroom,
    onChangeLottery,
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
    </div>
  )
}

export default inject('event')(observer(ApplicationView))
