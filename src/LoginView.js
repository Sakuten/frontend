import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('credential')
@observer
export class LoginView extends Component {
  render() {
    return (
      <div>
        <input type="text" name="username" value={this.props.credential.username} onChange={e => { this.props.credential.username = e.target.value }} />
        <input type="text" name="password" value={this.props.credential.password} onChange={e => { this.props.credential.password = e.target.value }} />
        <button onClick={this.props.credential.login}>Login</button>
      </div>
    );
  }
}
