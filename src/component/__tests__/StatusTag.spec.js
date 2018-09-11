import React from 'react'
import { shallow } from 'enzyme'
import StatusTag from '../StatusTag'

const setup = (propOverrides) => {
  const props = Object.assign({}, propOverrides)

  const wrapper = shallow(<StatusTag {...props} />)

  return {
    props,
    wrapper,
    tags: wrapper.find('[data-test="statustag-tags"]'),
    left: wrapper.find('[data-test="statustag-left"]'),
    primary: wrapper.find('[data-test="statustag-primary"]'),
    single: wrapper.find('[data-test="statustag-single"]')
  }
}

describe('components', () => {
  describe('StatusTag', () => {
    it('render', () => {
      const { wrapper } = setup()
      expect(wrapper).toMatchSnapshot()
    })

    it.each`
    status | result
    ${'pending'}  | ${'発表をお待ちください。'}
    ${'won'}  | ${'当選しました。'}
    ${'lose'}  | ${'落選しました。'}
    `('translates a passed status', ({status, result}) => {
      const { primary } = setup({status})
      expect(primary.text()).toBe(result)
    })


    it('renders a passed unknown status', () => {
      const { primary } = setup({status: 'Unknown Status Yeah'})
      expect(primary.text()).toBe('Unknown Status Yeah')
    })

    it('renders no left side when no left is supplied', () => {
      const { left } = setup({status: 'Unknown Status Yeah'})
      expect(left).toHaveLength(0)
    })

    it('renders a left value', () => {
      const { left } = setup({status: 'Unknown Status Yeah', left: 'Lefty'})
      expect(left.text()).toBe('Lefty')
    })
  })
})
