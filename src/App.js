import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { inject, observer } from 'mobx-react';

@inject('credential')
@observer
class App extends Component {
  render() {
    return (
      <div>
        <input type="text" name="username" value={this.props.credential.username} onChange={e => { this.props.credential.username = e.target.value }} />
        <input type="text" name="password" value={this.props.credential.password} onChange={e => { this.props.credential.password = e.target.value }} />
        <button onClick={() => this.props.credential.login()}>Login</button>
        {this.props.credential.token}
      </div>
    );
  }
}

export default App;
