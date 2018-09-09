import React from 'react'
import { shallow } from 'enzyme'
import GroupMemberList from '../GroupMemberList'

const setup = propOverrides => {
  const props = Object.assign({
    list: [
      'public_id1',
      'public_id2',
      'public_id3'
    ],
    onRemove: jest.fn()
  }, propOverrides)

  const wrapper = shallow(<GroupMemberList {...props} />)

  return {
    props,
    wrapper,
    member: wrapper.find('[data-test="groupmemberlist-member"]'),
    removeButton: wrapper.find('[data-test="groupmemberlist-remove"]'),
    notfound: wrapper.find('[data-test="groupmemberlist-notfound"]')
  }
}

describe('components', () => {
  describe('GroupMemberList', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders a message when the list was empty', () => {
      const { notfound } = setup({list: []})
      expect(notfound.length).toBe(1)
    })

    it('renders two members', () => {
      const { member } = setup()
      expect(member.length).toBe(3)
    })

    it('renders two cancel buttons', () => {
      const { removeButton } = setup()
      expect(removeButton.length).toBe(3)
    })

    it('calls onRemove with index when remove button is clicked', () => {
      const mock = jest.fn()
      const { removeButton } = setup({onRemove: mock})
      removeButton.at(2).simulate('click')
      expect(mock).toBeCalledWith(2)
    })
  })
})
