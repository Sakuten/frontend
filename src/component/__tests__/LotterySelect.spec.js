import React from 'react'
import { shallow } from 'enzyme'
import LotterySelect from '../LotterySelect'

const setup = propOverrides => {
  const props = Object.assign({
    list: [
      {
        'classroom_id': 1,
        'done': false,
        'id': 3,
        'index': 2,
        'name': '5A.2'
      },
      {
        'classroom_id': 1,
        'done': false,
        'id': 4,
        'index': 3,
        'name': '5A.3'
      },
      {
        'classroom_id': 2,
        'done': false,
        'id': 5,
        'index': 0,
        'name': '5B.0'
      },
      {
        'classroom_id': 2,
        'done': false,
        'id': 6,
        'index': 1,
        'name': '5B.1'
      }
    ],
    value: 3,
    classroom: 1,
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
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders two options', () => {
      const { wrapper } = setup()
      expect(wrapper.find('[data-test="lottery-option"]').length).toBe(2)
      expect(wrapper.find('[data-test="lottery-option"]').at(0).props().value).toBe(3)
      expect(wrapper.find('[data-test="lottery-option"]').at(1).props().value).toBe(4)
    })

    it('renders with human-readable messages', () => {
      const { wrapper } = setup()
      expect(wrapper.find('[data-test="lottery-option"]').at(0).text()).toBe('第3公演')
      expect(wrapper.find('[data-test="lottery-option"]').at(1).text()).toBe('第4公演')
    })

    it('renders only in same classroom', () => {
      const { wrapper } = setup({classroom: 2})
      expect(wrapper.find('[data-test="lottery-option"]').length).toBe(2)
      expect(wrapper.find('[data-test="lottery-option"]').at(0).props().value).toBe(5)
      expect(wrapper.find('[data-test="lottery-option"]').at(1).props().value).toBe(6)
    })

    it('calls onChange with id when something is selected', () => {
      const mock = jest.fn()
      const { wrapper } = setup({onChange: mock})
      wrapper.find('[data-test="lottery-select"]').simulate('change', {target: {value: 4}})
      expect(mock).toBeCalledWith(4)
    })

    it('renders specified id', () => {
      const { wrapper } = setup({value: 4})
      expect(wrapper.find('[data-test="lottery-select"]').props().value).toBe(4)
    })
  })
})
