import { shallow, mount } from 'enzyme'
import FormField from './FormField'

describe('<FormField />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<FormField />)

    expect(wrapper.find(FormField).length).toBe(1)
  })

  it('renders the label', () => {
    const wrapper = shallow(<FormField />)

    expect(wrapper.find('[data-test-class="form-field-label"]').length).toBe(1)
  })

  it('renders a validation error', () => {
    const wrapper = shallow(<FormField validationErrorText="Sample text" />)

    expect(wrapper.find('[data-test-class="validation-error"]').length).toBe(1)
  })
})
