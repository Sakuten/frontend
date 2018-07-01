import React from 'react'
import { shallow } from 'enzyme'
import ApplicationList from '../ApplicationList'

const setup = propOverrides => {
  const props = Object.assign({
    list: [
      {
        'id': 24,
        'lottery_id': 1,
        'status': null,
        'user_id': 3
      },
      {
        'id': 25,
        'lottery_id': 2,
        'status': null,
        'user_id': 3
      }
    ],
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
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders nothing without list', () => {
      const { wrapper } = setup({list: null})
      expect(wrapper.find('[data-test="application"]').length).toBe(0)
    })

    it('renders two applications', () => {
      const { wrapper } = setup()
      expect(wrapper.find('[data-test="application"]').length).toBe(2)
    })

    it('renders two cancel buttons', () => {
      const { wrapper } = setup()
      expect(wrapper.find('[data-test="cancel"]').length).toBe(2)
    })

    it('calls onCancel with lottery id when cancel button is clicked', () => {
      const mock = jest.fn()
      const { wrapper } = setup({list: [{lottery_id: 1}], onCancel: mock})
      wrapper.find('[data-test="cancel"]').at(0).simulate('click')
      expect(mock).toBeCalledWith(1)
    })
  })
})
