import React from 'react'
import { shallow, mount } from 'enzyme'
import deepAssign from 'deep-assign'
import createBrowserHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router'
import { Provider } from 'mobx-react'
import App from '../App'
import {Store} from '../../store'
import {Event} from '../../event'

const setup = (propOverrides, storeOverrides, isShallow = true) => {
  const store = deepAssign(new Store(), storeOverrides)
  const event = new Event(store)
  const props = Object.assign({
    store
  }, propOverrides)

  const browserHistory = createBrowserHistory()
  const history = syncHistoryWithStore(browserHistory, store.router)
  const dom = (
    <Provider event={event} >
      <Router history={history} >
        <App store={store} />
      </Router>
    </Provider>
  )
  const wrapper = (isShallow ? shallow : mount)(dom)

  return {
    props,
    wrapper,
    store,
    applicationView: wrapper.find('[data-test="applicationview"]'),
    loginView: wrapper.find('[data-test="loginview"]')
  }
}

describe('containers', () => {
  describe('App', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    // it('renders ApplicationView when it isn\'t logged in', () => {
    //   const { loginView, applicationView } = setup({}, {credential: {token: 'token'}}, false)
    //   expect(applicationView.length).toBe(1)
    //   expect(loginView.length).toBe(0)
    // })

    // it('renders LoginView when it is logged in', () => {
    //   const { loginView, applicationView } = setup({}, {credential: {token: ''}}, false)
    //   expect(applicationView.length).toBe(0)
    //   expect(loginView.length).toBe(1)
    // })
  })
})
