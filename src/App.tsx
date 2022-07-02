import styled from 'styled-components'
import Frame from './components/Frame'

const App = () => {
  return (
    <Container>
      <h1>minesweeper</h1>
      <Frame />
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
