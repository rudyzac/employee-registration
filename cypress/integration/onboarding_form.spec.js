import Countries from "../../src/enums/countries"

const checkFieldIsRendered = (fieldDescription, fieldTestId) => {
  it(`displays a field for ${fieldDescription}`, () => {
    cy.get(`[data-test-id=${fieldTestId}]`).should('have.length', 1)
  })
}

const checkValidationErrorForRequiredField = (fieldDescription, fieldTestId) => {
  it(`displays a validation error if ${fieldDescription} is left blank`, () => {
    cy.get('input[type=submit]').click()

    cy.get(`[data-test-id=${fieldTestId}] + [data-test-class=validation-error]`)
      .should('have.text', `${fieldDescription} is required.`)
  })
}

const checkFieldIsNotRendered = (fieldDescription, fieldTestId) => {
  it(`does not display a field for ${fieldDescription}`, () => {
    cy.get(`[data-test-id=${fieldTestId}]`).should('not.exist')
  })
}

describe('Onboarding form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  const baseFields = [
    { description: 'First name', testId: 'first-name-input' },
    { description: 'Last name', testId: 'last-name-input' },
    { description: 'Date of birth', testId: 'date-of-birth-input' },
    { description: 'Country of work', testId: 'country-of-work-select' },
    { description: 'Holiday allowance', testId: 'holiday-allowance-input' }
  ]

  const countrySpecificFields = [
    { description: 'Marital status', testId: 'marital-status-select', country: Countries.Spain },
    { description: 'Social insurance number', testId: 'social-insurance-number-input', country: Countries.Spain },
    { description: 'Marital status', testId: 'marital-status-select', country: Countries.France },
    { description: 'Number of children', testId: 'number-of-children-input', country: Countries.France },
    { description: 'Working hours', testId: 'working-hours-input', country: Countries.Belgium },
  ]

  describe('Base fields', () => {
    // Not using fixtures here b/c I prefer having a single assertion per test.
    baseFields.forEach(field => {
      checkFieldIsRendered(field.description, field.testId)
      checkValidationErrorForRequiredField(field.description, field.testId)
    })

    countrySpecificFields.forEach(field => {
      checkFieldIsNotRendered(field.description, field.testId)
    })    
  })

  describe('Spain', () => {
    beforeEach(() => {
      cy.get('[data-test-id=country-of-work-select]').select(Countries.Spain)
    })

    baseFields.forEach(field => checkFieldIsRendered(field.description, field.testId))

    countrySpecificFields
      .filter(field => field.country === Countries.Spain)
      .forEach(field => {
        it(`displays a field for ${field.description}`, () => {
          cy.get(`[data-test-id=${field.testId}]`).should('have.length', 1)
        })

        checkValidationErrorForRequiredField(field.description, field.testId)
      })

    it('displays a validation error if holiday allowance is less than 30', () => {
      cy.get('[data-test-id=holiday-allowance-input]').type('29')
      cy.get('input[type=submit]').click()

      cy.get('[data-test-id=holiday-allowance-input] + [data-test-class=validation-error]')
        .should('have.text', 'Minimum holiday allowance is 30.')
    })
  })

  // Analogous tests can be written for other countries
})
