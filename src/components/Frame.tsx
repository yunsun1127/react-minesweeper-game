import { useEffect, useReducer, useRef } from 'react'
import styled from 'styled-components'
import Board from './Board'
import { GAMES } from '../constants'
import { reducer, initialState } from '../utils/reducer'

const Frame = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { gameState, mineCount, flagCount } = state
  const initialMount = useRef(true)

  const setupGame = () => {
    dispatch({ type: 'SET_GAME' })
  }

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false
    } else {
      setupGame()
    }
  }, [])

  return (
    <Container>
      <Info style={{ marginBottom: 10 }}>
        <div>
          💣: {mineCount - flagCount}/{mineCount}
        </div>
        <button onClick={setupGame}>RESTRAT</button>
      </Info>
      {gameState !== GAMES.PLAY && (
        <Overlay>
          <Text>
            {gameState === GAMES.WIN ? 'YOU WIN!' : 'GAME OVER...'}
            <button onClick={setupGame}>REPLAY</button>
          </Text>
        </Overlay>
      )}
      <Board state={state} dispatch={dispatch} />
    </Container>
  )
}

export default Frame

const Container = styled.div`
  position: relative;
`

const Info = styled.div`
  display: flex;
  justify-content: space-around;
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  z-index: 2;
  margin: 0 auto;
  transform: translate(-50%, -50%);
  z-index: 2;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 2px #968b8b;
`
