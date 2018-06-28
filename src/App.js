import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { inject, observer } from 'mobx-react';
import {LoginView} from './LoginView'
import {ApplicationView} from './ApplicationView'

@inject('credential')
@observer
class App extends Component {
  render() {
    return (
      <div>
        {this.props.credential.isLoggedIn ? <ApplicationView /> : <LoginView />}
      </div>
    );
  }
}

export default App;
