import React from 'react'
import { shallow } from 'enzyme'
import ErrorList from '../ErrorList'

const setup = propOverrides => {
  const props = Object.assign({
    list: [
      { message: 'Error 1' },
      { message: 'Error 2' }]
  }, propOverrides)

  const wrapper = shallow(<ErrorList {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('ErrorList', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders two errors', () => {
      const { wrapper } = setup()
      expect(wrapper.find('[data-test="errorlist-error"]').length).toBe(2)
    })
  })
})
