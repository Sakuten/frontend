import React from 'react'
import { shallow } from 'enzyme'
import Home from '../Home'

const setup = propOverrides => {
  const props = propOverrides

  const wrapper = shallow(<Home {...props} />)

  return {
    props,
    wrapper,
    link: wrapper.find('[data-test="home-login"]')
  }
}

describe('components', () => {
  describe('Home', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders login link', () => {
      const { link } = setup()
      expect(link.length).toBe(1)
    })
  })
})
