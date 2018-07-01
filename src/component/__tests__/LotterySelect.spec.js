import React from 'react'
import { shallow } from 'enzyme'
import LotterySelect from '../LotterySelect'

const setup = propOverrides => {
  const props = Object.assign({
    list: [],
    value: 0,
    classroom: 0,
    onChange: jest.fn()
  }, propOverrides)

  const wrapper = shallow(<LotterySelect {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('LotterySelect', () => {
    test('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })
  })
})
