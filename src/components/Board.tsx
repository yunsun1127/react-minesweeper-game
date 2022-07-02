import { useCallback } from 'react'
import styled from 'styled-components'
import { CODES, GAMES } from '../constants'
import { Action, InitialState } from '../utils/reducer'

interface Props {
  state: InitialState
  dispatch: React.Dispatch<Action>
}

const Board = ({ state, dispatch }: Props) => {
  const { gameState, boardData } = state
  const getCellText = useCallback(
    (code: number | string) => {
      switch (code) {
        case CODES.INIT:
        case CODES.OPEND:
          return ''
        case CODES.FLAG:
          return '🚩'
        case CODES.MINE_FLAG:
          if (gameState === GAMES.PLAY) return '🚩'
          return '💣'
        case CODES.MINE:
          if (gameState === GAMES.PLAY) return ''
          return '💣'
        default:
          return code
      }
    },
    [gameState],
  )

  return (
    <>
      {boardData.map((item, row) => (
        <Wrapper key={`row${row}`}>
          {item.map((code, col) => {
            const tileOpened = !(code === CODES.INIT || code === CODES.MINE)
            return (
              <Tile
                key={`colum${col}`}
                className={tileOpened ? 'opened' : ''}
                onClick={() => dispatch({ type: 'OPEN_CELL', row, col })}
                onContextMenu={(e) => {
                  e.preventDefault()
                  dispatch({ type: 'SET_FLAG', row, col })
                }}
              >
                {getCellText(code)}
              </Tile>
            )
          })}
        </Wrapper>
      ))}
    </>
  )
}

export default Board

const Wrapper = styled.div`
  display: flex;
`

const Tile = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;
  background-color: #e0e0e0;
  border: 2px solid #fff;
  border-radius: 8px;

  :hover {
    background-color: #b1b1b1;
  }

  &.opened {
    background-color: #898787;
  }
`
