import { shallow, mount } from 'enzyme'
import Countries from '../enums/countries'
import OnboardingForm, { exportedForTesting }  from './OnboardingForm'

describe('<OnboardingForm />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<OnboardingForm />)

    expect(wrapper.find(OnboardingForm).length).toBe(1)
  })

  describe('Non-conditional elements', () => {
    let wrapper = {}
    beforeEach(() => {
      wrapper = shallow(<OnboardingForm />)
    })

    it('renders the form', () => expect(wrapper.find('form').length).toBe(1))

    it('renders an <input> for the first name', () => {
      expect(wrapper.find(`[data-test-id="first-name-input"]`).length).toBe(1)
    })

    it('renders an <input> for the last name', () => {
      expect(wrapper.find(`[data-test-id="last-name-input"]`).length).toBe(1)
    })

    it('renders an <input> for the date of birth', () => {
      expect(wrapper.find(`[data-test-id="date-of-birth-input"]`).length).toBe(1)
    })

    it('renders a <select> for the country of work', () => {
      expect(wrapper.find(`[data-test-id="country-of-work-select"]`).length).toBe(1)
    })
  })

  describe('Validators', () => {
    const { buildDefaultValidator, buildHolidayAllowanceValidator } = exportedForTesting

    test('default validator is built properly', () => {
      const expected = {
        required: { value: true, message: 'Test field is required.' }
      }

      const actual = buildDefaultValidator('Test field')

      expect(actual).toEqual(expected)
    })

    describe('Holiday allowance', () => {
      const fieldDescription = 'Holiday allowance'

      test('Spain validator is built properly', () => {
        const expected = {
          required: { value: true, message: `${fieldDescription} is required.` },
          min: { value: 30, message: 'Minimum holiday allowance is 30.' }
        }
        
        const actual = buildHolidayAllowanceValidator(Countries.Spain, buildDefaultValidator(`${fieldDescription}`))

        expect(actual).toEqual(expected)
      })

      test('Belgium validator is built properly', () => {
        const expected = {
          required: { value: true, message: `${fieldDescription} is required.` },
          max: { value: 40, message: 'Maximum holiday allowance is 40.' }
        }

        const actual = buildHolidayAllowanceValidator(Countries.Belgium, buildDefaultValidator(`${fieldDescription}`))

        expect(actual).toEqual(expected)
      })

      test('Non-specific validator is built properly', () => {
        const expected = {
          required: { value: true, message: `${fieldDescription} is required.` }
        }

        const actual = buildHolidayAllowanceValidator('Non-listed country', buildDefaultValidator(`${fieldDescription}`))

        expect(actual).toEqual(expected)
      })
    })

  })

})
