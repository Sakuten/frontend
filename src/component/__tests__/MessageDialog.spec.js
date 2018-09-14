import React from 'react'
import { shallow } from 'enzyme'
import MessageDialog from '../MessageDialog'

const setup = (propOverrides, children) => {
  const props = Object.assign({}, propOverrides)

  const wrapper = shallow(<MessageDialog {...props}>{children}</MessageDialog>)

  return {
    props,
    wrapper,
    body: wrapper.find('[data-test="messagedialog-body"]'),
    title: wrapper.find('[data-test="messagedialog-title"]'),
    button: wrapper.find('[data-test="messagedialog-button"]')
  }
}

describe('components', () => {
  describe('MessageDialog', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders a children', () => {
      const { body } = setup({}, <p>Hello, World</p>)
      expect(body.text()).toBe('Hello, World')
    })

    it('renders a children', () => {
      const { title } = setup({title: 'Hello'}, '')
      expect(title.text()).toBe('Hello')
    })

    it('calls onClose when button is clicked', () => {
      const mock = jest.fn()
      const { button } = setup({onClose: mock})
      button.simulate('click')
      expect(mock).toBeCalled()
    })
  })
})
