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
  const props = Object.assign({
    credential: store.credential
  }, propOverrides)

  const wrapper = (isShallow ? shallow : mount)(<Provider event={event}><CheckerView {...props} /></Provider>)

  return {
    props,
    wrapper,
    store,
    event
  }
}

describe('containers', () => {
  describe('CheckerView', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
