import React from 'react'
import { shallow, mount } from 'enzyme'
import deepAssign from 'deep-assign'
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

  const wrapper = (isShallow ? shallow : mount)(<Provider event={event}><App {...props} /></Provider>)

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

    it('renders ApplicationView when it isn\'t logged in', () => {
      const { loginView, applicationView } = setup({}, {credential: {token: 'token'}}, false)
      expect(applicationView.length).toBe(1)
      expect(loginView.length).toBe(0)
    })

    it('renders LoginView when it is logged in', () => {
      const { loginView, applicationView } = setup({}, {credential: {token: ''}}, false)
      expect(applicationView.length).toBe(0)
      expect(loginView.length).toBe(1)
    })
  })
})
