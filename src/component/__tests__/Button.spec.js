import React from 'react'
import { shallow } from 'enzyme'
import Button from '../Button'

const setup = (propOverrides, children) => {
  const props = Object.assign({}, propOverrides)

  const wrapper = shallow(<Button {...props}>{children}</Button>)

  return {
    props,
    wrapper,
    text: wrapper.find('[data-test="button-text"]'),
    link: wrapper.find('[data-test="button-link"]')
  }
}

describe('components', () => {
  describe('Button', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders a children', () => {
      const { text } = setup({}, <p>Hello, World</p>)
      expect(text.children().text()).toBe('Hello, World')
    })

    it('links to \'to\' prop', () => {
      const { link } = setup({to: '/hi'}, null)
      expect(link.prop('to')).toBe('/hi')
    })
  })
})
