import React from 'react'
import ReactDOM from 'react-dom'
import App from './container/App'
import { Provider } from 'mobx-react'
import createBrowserHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore } from 'mobx-react-router'
import registerServiceWorker from './util/registerServiceWorker'
import { Router } from 'react-router'
import {Store} from './store'
import {Event} from './event'
import {configure} from 'mobx'
import './style/index.css'

configure({ enforceActions: true })

const store = new Store()
const event = new Event(store)

const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, store.router)

ReactDOM.render(
  <Provider event={event} >
    <Router history={history} >
      <App store={store} />
    </Router>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
