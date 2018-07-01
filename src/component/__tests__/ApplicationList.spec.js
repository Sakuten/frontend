import React from 'react'
import { shallow } from 'enzyme'
import ApplicationList from '../ApplicationList'

const setup = propOverrides => {
  const props = Object.assign({
    list: [],
    onCancel: jest.fn()
  }, propOverrides)

  const wrapper = shallow(<ApplicationList {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('ApplicationList', () => {
    test('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
