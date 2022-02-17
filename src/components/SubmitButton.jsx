import React from 'react'
import styled from 'styled-components'

const SubmitButton = () => <SubmitInput type="submit" value="Submit" />

const SubmitInput = styled.input`
  padding: 0.46em 1.6em;
  border: 0.1em solid #000000;
  margin: 0 0.2em 0.2em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: #000000;
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
  background-color: #EA6838;
  text-align: center;
  transition: all 0.15s;

&:hover {
  text-shadow: 0 0 2em rgba(255,255,255,1);
  color: #FFFFFF;
  border-color: #FFFFFF;
  cursor: pointer;
}
`

export default SubmitButton
