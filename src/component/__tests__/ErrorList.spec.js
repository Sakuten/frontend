import React from 'react'
import { shallow } from 'enzyme'
import ErrorList from '../ErrorList'

const setup = propOverrides => {
  const props = Object.assign({
    list: []
  }, propOverrides)

  const wrapper = shallow(<ErrorList {...props} />)

  return {
    props,
    wrapper,
  }
}

describe('components', () => {
  describe('ErrorList', () => {
    test('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
