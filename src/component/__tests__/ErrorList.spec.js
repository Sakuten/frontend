import React from 'react'
import { shallow } from 'enzyme'
import ErrorList from '../ErrorList'
import errors from '../../errors.json'

const setup = propOverrides => {
  const props = Object.assign({
    list: [
      { code: 0, message: 'Error 1' },
      { code: 1, message: 'Error 2' }]
  }, propOverrides)

  const wrapper = shallow(<ErrorList {...props} />)

  return {
    props,
    wrapper,
    error: wrapper.find('[data-test="errorlist-error"]'),
    header: wrapper.find('[data-test="errorlist-error-header"]'),
    body: wrapper.find('[data-test="errorlist-error-body"]')
  }
}

describe('components', () => {
  describe('ErrorList', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders two errors', () => {
      const { error } = setup()
      expect(error.length).toBe(2)
    })

    it('renders correct error message', () => {
      const { body } = setup()
      expect(body.at(0).text()).toBe(errors['0'].translation)
      expect(body.at(1).text()).toBe(errors['1'].translation)
    })
  })
})
