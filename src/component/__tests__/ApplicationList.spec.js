import React from 'react'
import { shallow } from 'enzyme'
import ApplicationList from '../ApplicationList'

const setup = propOverrides => {
  const props = Object.assign({
    list: [
      {
        'id': 1,
        'lottery': {
          'classroom_id': 1,
          'done': false,
          'id': 1,
          'index': 0,
          'name': '5A.0',
          'winners': []
        },
        'status': 'pending'
      },
      {
        'id': 2,
        'lottery': {
          'classroom_id': 1,
          'done': false,
          'id': 2,
          'index': 0,
          'name': '5A.0',
          'winners': []
        },
        'status': 'pending'
      }
    ],
    onCancel: jest.fn()
  }, propOverrides)

  const wrapper = shallow(<ApplicationList {...props} />)

  return {
    props,
    wrapper,
    application: wrapper.find('[data-test="applicationlist-application"]'),
    cancelButton: wrapper.find('[data-test="applicationlist-cancel"]')
  }
}

describe('components', () => {
  describe('ApplicationList', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders nothing without list', () => {
      const { application } = setup({list: null})
      expect(application.length).toBe(0)
    })

    it('renders two applications', () => {
      const { application } = setup()
      expect(application.length).toBe(2)
    })

    it('renders two cancel buttons', () => {
      const { cancelButton } = setup()
      expect(cancelButton.length).toBe(2)
    })

    it('calls onCancel with lottery id when cancel button is clicked', () => {
      const mock = jest.fn()
      const { cancelButton } = setup({list: [{lottery_id: 1}], onCancel: mock})
      cancelButton.at(0).simulate('click')
      expect(mock).toBeCalledWith(1)
    })
  })
})
