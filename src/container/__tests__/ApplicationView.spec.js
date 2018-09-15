import React from 'react'
import { shallow, mount } from 'enzyme'
import deepAssign from 'deep-assign'
import { Provider } from 'mobx-react'
import ApplicationView from '../ApplicationView'
import {Store} from '../../store'
import {Event} from '../../event'

const setup = (propOverrides, storeOverrides, eventOverrides, isShallow = true) => {
  const store = deepAssign(new Store(), storeOverrides)
  const event = deepAssign(new Event(store), eventOverrides)
  const props = Object.assign({
    credential: store.credential,
    application: store.application
  }, propOverrides)

  const wrapper = (isShallow ? shallow : mount)(<Provider event={event}><ApplicationView {...props} /></Provider>)

  return {
    props,
    wrapper,
    store,
    event,
    title: wrapper.find('[data-test="applicationview-title"]')
  }
}

describe('containers', () => {
  describe('ApplicationView', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders classroom options', async () => {
      const { event, wrapper } = setup({}, {}, {}, false)
      await event.application.onUpdate()
      expect(wrapper.render().find('[data-test="classroom-option"]').length).toBe(8)
    })

    it('renders application list', async () => {
      const { store, wrapper } = setup({}, {}, {}, false)
      await store.fetchStatus()
      expect(wrapper.render().find('[data-test="applicationlist-application"]').length).toBe(1)
    })
  })
})
