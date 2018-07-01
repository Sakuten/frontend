import React from 'react'
import { shallow } from 'enzyme'
import ClassroomSelect from '../ClassroomSelect'

const setup = propOverrides => {
  const props = Object.assign({
    list: [],
    value: 0,
    onChange: jest.fn()
  }, propOverrides)

  const wrapper = shallow(<ClassroomSelect {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('ClassroomSelect', () => {
    test('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
