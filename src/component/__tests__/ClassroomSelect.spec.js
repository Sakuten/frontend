import React from 'react'
import { shallow } from 'enzyme'
import ClassroomSelect from '../ClassroomSelect'

const setup = propOverrides => {
  const props = Object.assign({
    list: [
      {
        'grade': 5,
        'id': 1,
        'index': 0,
        'name': 'A'
      },
      {
        'grade': 5,
        'id': 2,
        'index': 1,
        'name': 'B'
      }
    ],
    value: 0,
    onChange: jest.fn()
  }, propOverrides)

  const wrapper = shallow(<ClassroomSelect {...props} />)

  return {
    props,
    wrapper,
    select: wrapper.find('[data-test="classroom-select"]'),
    option: wrapper.find('[data-test="classroom-option"]')
  }
}

describe('components', () => {
  describe('ClassroomSelect', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it('renders two options', () => {
      const { option } = setup()
      expect(option.length).toBe(2)
    })

    it('renders with grade and name', () => {
      const { option } = setup()
      expect(option.at(0).text()).toBe('5 A')
      expect(option.at(1).text()).toBe('5 B')
    })

    it('calls onChange with id when something is selected', () => {
      const mock = jest.fn()
      const { select } = setup({onChange: mock})
      select.simulate('change', {target: {value: 2}})
      expect(mock).toBeCalledWith(2)
    })

    it('renders specified id', () => {
      const { select } = setup({value: 2})
      expect(select.props().value).toBe(2)
    })
  })
})
