import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('event')
@observer
export class ApplicationView extends Component {
  render() {
    return (
      <div>
        <h1>Logged in as {this.props.user.get('username')}</h1>
        <button onClick={this.props.event.credential.logout}>Logout</button>
      </div>
    );
  }
}
