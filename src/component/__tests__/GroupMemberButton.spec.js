import React from 'react'
import { shallow } from 'enzyme'
import GroupMemberButton from '../GroupMemberButton'

const setup = propOverrides => {
  const props = Object.assign({
    onAdd: jest.fn()
  }, propOverrides)

  const wrapper = shallow(<GroupMemberButton {...props} />)

  return {
    props,
    wrapper,
    button: wrapper.find('[data-test="groupmemberbutton-button"]')
  }
}

describe('components', () => {
  describe('GroupMemberButton', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders button', () => {
      const { button } = setup()
      expect(button.exists()).toBe(true)
    })

    it('changes view when button is clicked', () => {
      const { wrapper, button } = setup()
      button.simulate('click')
      // refactoring required: reuse `button` to see the changes
      expect(wrapper.find('[data-test="groupmemberbutton-button"]').exists()).toBe(false)
    })
  })
})
