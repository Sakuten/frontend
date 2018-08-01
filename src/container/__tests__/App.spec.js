import React from 'react'
import { shallow, mount } from 'enzyme'
import deepAssign from 'deep-assign'
import { MemoryRouter } from 'react-router'
import { Provider } from 'mobx-react'
import App from '../App'
import {Store} from '../../store'
import {Event} from '../../event'

const setup = (propOverrides, storeOverrides, path = '/', isShallow = true) => {
  const store = deepAssign(new Store(), storeOverrides)
  const event = new Event(store)
  const props = Object.assign({
    store
  }, propOverrides)

  const dom = (
    <Provider event={event} >
      <MemoryRouter initialEntries={[path]}>
        <App store={store} />
      </MemoryRouter>
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

    it('renders ApplicationView when it is logged in', () => {
      const { loginView, applicationView } = setup({}, {credential: {token: 'token'}}, '/lottery', false)
      expect(applicationView.length).toBe(1)
      expect(loginView.length).toBe(0)
    })

    it('renders LoginView when it isn\'t logged in', () => {
      const { loginView, applicationView } = setup({}, {credential: {token: ''}}, '/lottery/login', false)
      expect(applicationView.length).toBe(0)
      expect(loginView.length).toBe(1)
    })

    it('redirects from /lottery to /lottery/login when it isn\'t logged in', () => {
      const { wrapper } = setup({}, {credential: {token: ''}}, '/lottery', false)
      expect(wrapper.find('Redirect').prop('to')).toBe('/lottery/login')
    })

    it('redirects from /lottery/login to /lottery when it is logged in', () => {
      const { wrapper } = setup({}, {credential: {token: 'token'}}, '/lottery/login', false)
      expect(wrapper.find('Redirect').prop('to')).toBe('/lottery')
    })
  })
})
