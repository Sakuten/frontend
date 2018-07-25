import React from 'react'
import { shallow, mount } from 'enzyme'
import deepAssign from 'deep-assign'
import { Provider } from 'mobx-react'
import LoginView from '../LoginView'
import {Store} from '../../store'
import {Event} from '../../event'

const setup = (propOverrides, storeOverrides, eventOverrides, isShallow = true) => {
  const store = deepAssign(new Store(), storeOverrides)
  const event = deepAssign(new Event(store), eventOverrides)
  const props = Object.assign({
    credential: store.credential
  }, propOverrides)

  const wrapper = (isShallow ? shallow : mount)(<Provider event={event}><LoginView {...props} /></Provider>)

  return {
    props,
    wrapper,
    store,
    event,
    usernameInput: wrapper.find('[data-test="loginview-username"]'),
    loginButton: wrapper.find('[data-test="loginview-login"]')
  }
}

describe('containers', () => {
  describe('LoginView', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders username stored in store', () => {
      const { usernameInput } = setup({}, {credential: {username: 'username'}}, {}, false)
      expect(usernameInput.props().value).toBe('username')
    })
  })
})
