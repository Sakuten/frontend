import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('event')
@observer
export class LoginView extends Component {
  render() {
    return (
      <div>
        <input type="text" name="username" value={this.props.credential.username} onChange={e => { this.props.credential.setUsername(e.target.value) }} />
        <input type="text" name="password" value={this.props.credential.password} onChange={e => { this.props.credential.setPassword(e.target.value) }} />
        <button onClick={this.props.event.credential.login}>Login</button>
      </div>
    );
  }
}
