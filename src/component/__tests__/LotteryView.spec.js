import React from 'react'
import { shallow } from 'enzyme'
import LotteryView from '../LotteryView'

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

  const wrapper = shallow(<LotteryView {...props} />)

  return {
    props,
    wrapper,
    select: wrapper.find('[data-test="lottery-select"]'),
    option: wrapper.find('[data-test="lottery-option"]')
  }
}

describe('components', () => {
  describe('LotteryView', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders two options', () => {
      const { option } = setup()
      expect(option.length).toBe(2)
      expect(option.at(0).props().value).toBe(3)
      expect(option.at(1).props().value).toBe(4)
    })

    it('renders with human-readable messages', () => {
      const { option } = setup()
      expect(option.at(0).text()).toBe('第3公演')
      expect(option.at(1).text()).toBe('第4公演')
    })

    it('renders only in same classroom', () => {
      const { option } = setup({classroom: 2})
      expect(option.length).toBe(2)
      expect(option.at(0).props().value).toBe(5)
      expect(option.at(1).props().value).toBe(6)
    })

    it('calls onChange with id when something is selected', () => {
      const mock = jest.fn()
      const { select } = setup({onChange: mock})
      select.simulate('change', {target: {value: 4}})
      expect(mock).toBeCalledWith(4)
    })

    it('renders specified id', () => {
      const { select } = setup({value: 4})
      expect(select.props().value).toBe(4)
    })
  })
})
