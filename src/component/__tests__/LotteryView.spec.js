import React from 'react'
import { shallow } from 'enzyme'
import LotteryView, { PerformanceNumber } from '../LotteryView'

const setup = propOverrides => {
  const props = Object.assign({
    list: [
      {
        'classroom_id': 1,
        'done': false,
        'id': 4,
        'index': 0,
        'name': '5A.0'
      },
      {
        'classroom_id': 2,
        'done': false,
        'id': 5,
        'index': 0,
        'name': '5B.0'
      }
    ],
    classroom: 1,
    onChange: jest.fn()
  }, propOverrides)

  const wrapper = shallow(<LotteryView {...props} />)

  return {
    props,
    wrapper,
    lottery: wrapper.find(PerformanceNumber),
    notfound: wrapper.find('[data-test="lottery-notfound"]'),
  }
}

describe('components', () => {
  describe('LotteryView', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders one lottery', () => {
      const { lottery } = setup()
      expect(lottery.length).toBe(1)
      expect(lottery.props().performN.id).toBe(4)
    })

    it('renders with human-readable messages', () => {
      const { lottery } = setup()
      expect(lottery.html()).toBe('<span data-test=\"lottery-lottery\" value=\"4\">第2公演</span>')
    })

    it('renders only in same classroom', () => {
      const { lottery } = setup({classroom: 2})
      expect(lottery.length).toBe(1)
      expect(lottery.props().performN.id).toBe(5)
    })

    it('renders a message when the list was empty', () => {
      const { notfound } = setup({list: []})
      expect(notfound.length).toBe(1)
    })
  })
})
