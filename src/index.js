import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';
import {Store} from './store'
import {Event} from './event'
import {configure} from 'mobx'

configure({ enforceActions: true })

const store = new Store()
const event = new Event(store)

ReactDOM.render(
  <Provider event={event}>
    <App store={store} />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
