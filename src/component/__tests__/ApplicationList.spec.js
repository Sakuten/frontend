import React from 'react'
import { shallow } from 'enzyme'
import ApplicationList from '../ApplicationList'

const setup = propOverrides => {
  window.confirm = () => true
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
          'end_of_drawing': '09:30:00',
          'winners': []
        },
        'is_rep': false,
        'is_member': false,
        'status': 'pending',
        'group_members': []
      },
      {
        'id': 2,
        'lottery': {
          'classroom_id': 1,
          'done': false,
          'id': 2,
          'index': 0,
          'name': '5A.0',
          'end_of_drawing': '09:30:00',
          'winners': []
        },
        'is_rep': true,
        'status': 'pending',
        'is_member': false,
        'group_members': [{'public_id': 'ABCD'}, {'public_id': 'EFGH'}]
      }
    ],
    onCancel: jest.fn()
  }, propOverrides)

  const wrapper = shallow(<ApplicationList {...props} />)

  return {
    props,
    wrapper,
    application: wrapper.find('[data-test="applicationlist-application"]'),
    cancelButton: wrapper.find('[data-test="applicationlist-cancel"]'),
    body: wrapper.find('[data-test="applicationlist-body"]'),
    notfound: wrapper.find('[data-test="applicationlist-notfound"]')
  }
}

describe('components', () => {
  describe('ApplicationList', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders a message when the list was empty', () => {
      const { notfound } = setup({list: []})
      expect(notfound.length).toBe(1)
    })

    it('renders two applications', () => {
      const { application } = setup()
      expect(application.length).toBe(2)
    })

    it('renders two cancel buttons', () => {
      const { cancelButton } = setup()
      expect(cancelButton.length).toBe(2)
    })

    it('renders two group members in the body of card', () => {
      const { body } = setup()
      console.log(body.at(1).text())
      expect(body.at(1).text().includes('ABCD')).toBe(true)
      expect(body.at(1).text().includes('EFGH')).toBe(true)
    })

    it('renders message only in is_rep application', () => {
      const { body } = setup()
      expect(body.at(0).text().includes('代表者')).toBe(false)
      expect(body.at(1).text().includes('代表者')).toBe(true)
    })

    it('renders no cancel button when status !== pending', () => {
      const { cancelButton } = setup({list: [{id: 1, status: 'won', group_members: [], lottery: {name: '5A.0'}}]})
      expect(cancelButton.length).toBe(0)
    })

    it('calls onCancel with application id when cancel button is clicked', () => {
      const mock = jest.fn()
      const { cancelButton } = setup({list: [{id: 1, status: 'pending', group_members: [], lottery: {name: '5A.0'}}], onCancel: mock})
      cancelButton.at(0).simulate('click')
      expect(mock).toBeCalledWith(1)
    })
  })
})
