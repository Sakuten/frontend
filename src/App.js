import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { inject, observer } from 'mobx-react';
import LoginView from './LoginView'
import ApplicationView from './ApplicationView'

@inject('event')
@observer
class App extends Component {
  render() {
    return (
      <div>
        {this.props.store.credential.isLoggedIn ? <ApplicationView user={this.props.store.credential.status} /> : <LoginView credential={this.props.store.credential} />}
      </div>
    );
  }
}

export default App;
