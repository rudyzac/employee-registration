import styled from 'styled-components'
import OnboardingForm from './components/OnboardingForm'

const App = () =>
  <Container>
    <OnboardingForm />
  </Container>

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0) linear-gradient(to right, #cfd9df, #e2ebf0) repeat scroll 0% 0%;
`

export default App;
