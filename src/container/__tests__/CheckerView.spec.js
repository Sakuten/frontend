import React from 'react'
import { shallow, mount } from 'enzyme'
import deepAssign from 'deep-assign'
import { Provider } from 'mobx-react'
import CheckerView from '../CheckerView'
import {Store} from '../../store'
import {Event} from '../../event'

const setup = (propOverrides, storeOverrides, eventOverrides, isShallow = true) => {
  const store = deepAssign(new Store(), storeOverrides)
  const event = deepAssign(new Event(store), eventOverrides)
  const props = Object.assign({store}, propOverrides)

  const wrapper = (isShallow ? shallow : mount)(<Provider event={event}><CheckerView {...props} /></Provider>)

  return {
    props,
    wrapper,
    store,
    event,
    button: wrapper.find('[data-test="checkerview-button"]')
  }
}

describe('containers', () => {
  describe('CheckerView', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('logouts when logout button is clicked', () => {
      const { button, store } = setup({}, {}, {}, false)
      button.simulate('click')
      expect(store.credential.isLoggedIn).toBe(false)
    })
  })
})
