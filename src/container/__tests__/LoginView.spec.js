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
    ReCAPTCHA: wrapper.find('ReCAPTCHA'),
    QRReader: wrapper.find('QRReader')
  }
}

describe('containers', () => {
  describe('LoginView', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders reCAPTCHA when secret id is set in the store', () => {
      const { QRReader, ReCAPTCHA } = setup({}, {credential: {secretId: 'secretId'}}, {}, false)
      expect(ReCAPTCHA).toHaveLength(1)
      expect(QRReader).toHaveLength(0)
    })

    it('renders QRReader when secret id is not set in the store', () => {
      const { QRReader, ReCAPTCHA } = setup({}, {credential: {secretId: ''}}, {}, false)
      expect(ReCAPTCHA).toHaveLength(0)
      expect(QRReader).toHaveLength(1)
    })
  })
})
