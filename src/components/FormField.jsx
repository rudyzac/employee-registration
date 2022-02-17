import React from 'react'
import styled from 'styled-components'

const FormField = props =>
  <Container>
    <Label htmlFor={props.name} data-test-class="form-field-label">{props.labelText}</Label>
    
    {props.children}
    
    <ValidationErrorMessage data-test-class="validation-error">
      {props.validationErrorText}
    </ValidationErrorMessage>
  </Container>

const Container = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  & input {
    padding: 15px;
    border: none;
  }
`

const Label = styled.label`
  flex: 1 0 7.5rem;
  max-width: 13.75rem;
  padding: 0.5rem;
  font-weight: 300;
  letter-spacing: .09em;
  text-transform: uppercase;

  & + * {
    flex: 1 0 13.75rem;
  }
`

const ValidationErrorMessage = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  color: red;
  width: 100%;
`

export default FormField
