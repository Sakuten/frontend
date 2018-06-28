import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';
import {CredentialStore} from './CredentialStore'


const credentialStore = new CredentialStore()

ReactDOM.render(
  <Provider credential={credentialStore}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
