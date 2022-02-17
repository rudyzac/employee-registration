import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Countries from '../enums/countries'
import FormField from './FormField'
import SubmitButton from './SubmitButton'

const OnboardingForm = props => {
  const { register, unregister, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      countryOfWork: "",
      maritalStatus: ""
    }
  })

  const selectedCountry = watch('countryOfWork')

  return (
    <Container>
      <form
        onSubmit={handleSubmit(data => console.log(JSON.stringify(data)))}
        onChange={() => unregister("holidayAllowance")}
      >
        <FieldContainer>
          <FormField name="firstName" labelText="First name" validationErrorText={errors?.firstName?.message}>
            <input
              type="text"
              {...register("firstName", buildDefaultValidator("First name"))}
              data-test-id="first-name-input"
            />
          </FormField>

          <FormField name="lastName" labelText="Last name" validationErrorText={errors?.lastName?.message}>
            <input
              type="text"
              {...register("lastName", buildDefaultValidator("Last name"))}
              data-test-id="last-name-input"
            />
          </FormField>

          <FormField name="dateOfBirth" labelText="Date of birth" validationErrorText={errors?.dateOfBirth?.message}>
            <input
              type="date"
              {...register("dateOfBirth", buildDefaultValidator("Date of birth"))}
              data-test-id="date-of-birth-input"
            />
          </FormField>

          <FormField name="countryOfWork" labelText="Country of work" validationErrorText={errors?.countryOfWork?.message}>
            <select {...register("countryOfWork", buildDefaultValidator("Country of work"))} data-test-id="country-of-work-select">
              <option value="">-- Select --</option>
              <option value={Countries.Spain} data-test-id="country-of-work-spain">Spain</option>
              <option value={Countries.France} data-test-id="country-of-work-france">France</option>
              <option value={Countries.Belgium} data-test-id="country-of-work-belgium">Belgium</option>
            </select>
          </FormField>

          {(selectedCountry === Countries.Spain || selectedCountry === Countries.France) &&
            <FormField name="maritalStatus" labelText="Marital status" validationErrorText={errors?.maritalStatus?.message}>
              <select {...register("maritalStatus", buildDefaultValidator("Marital status"))} data-test-id="marital-status-select">
                <option value="">-- Select --</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
                <option value="Divorced">Divorced</option>
              </select>
            </FormField>
          }

          {selectedCountry === Countries.France &&
            <FormField name="numberOfChildren" labelText="Number of children" validationErrorText={errors?.numberOfChildren?.message}>              
              <input
                type="number"
                min="0"
                step="1"
                {...register("numberOfChildren", buildDefaultValidator("Number of children"))}
                data-test-id="number-of-children-input"
              />
            </FormField>
          }

          {selectedCountry === Countries.Spain &&
            <FormField name="socialInsuranceNumber" labelText="Social insurance number" validationErrorText={errors?.socialInsuranceNumber?.message}>
              <input
                type="text"
                {...register("socialInsuranceNumber", buildDefaultValidator("Social insurance number"))}
                data-test-id="social-insurance-number-input"
              />
            </FormField>
          }

          <FormField name="holidayAllowance" labelText="Holiday allowance" validationErrorText={errors?.holidayAllowance?.message}>
            <input
              type="number"
              min="0"
              step="1"              
              {...register("holidayAllowance", buildHolidayAllowanceValidator(selectedCountry, buildDefaultValidator("Holiday allowance")))}
              data-test-id="holiday-allowance-input"
            />
          </FormField>

          {selectedCountry === Countries.Belgium &&
            <FormField name="workingHours" labelText="Working hours" validationErrorText={errors?.workingHours?.message}>              
              <input 
                type="number" 
                {...register("workingHours", buildDefaultValidator("Working hours"))}
                data-test-id="working-hours-input"
              />              
            </FormField>
          }

          <SubmitButtonContainer>
            <SubmitButton />
          </SubmitButtonContainer>

        </FieldContainer>
      </form>
    </Container>
  )
}

const Container = styled.div`
  width: 80%;
  max-width: 75rem;
  margin: 0 auto;

  & * {
    box-sizing: border-box;
  }
`

const FieldContainer = styled.ul`
  max-width: 50rem;
  margin: 0 auto;
  list-style-type: none;
  padding: 0;

  & > li:not(:last-child) {
    margin-bottom: 1.25rem;
  }
`

const buildDefaultValidator = fieldName => {
  return ({
    required: { value: true, message: `${fieldName} is required.` }
  })
}

const buildHolidayAllowanceValidator = (country, defaultOptions) => {
  let validationOptions = {}

  switch (country) {
    case Countries.Spain:
      validationOptions = { ...defaultOptions, ...{ min: { value: 30, message: 'Minimum holiday allowance is 30.' } } }
      break
    case Countries.Belgium:
      validationOptions = { ...defaultOptions, ...{ max: { value: 40, message: 'Maximum holiday allowance is 40.' } } }
      break
    default:
      validationOptions = defaultOptions
  }

  return validationOptions
}

const SubmitButtonContainer = styled.li`
  display: flex;  
  align-items: center;
  justify-content: end;
`

export default OnboardingForm
export const exportedForTesting = {
  buildDefaultValidator,
  buildHolidayAllowanceValidator
}
