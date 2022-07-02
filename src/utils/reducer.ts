import produce from 'immer'
import { CODES, GAMES, SIZE } from '../constants'
import { openCell } from './openCell'

const initBoard = (size: number, mineCount: number) => {
  const candidates = Array(size * size)
    .fill(null)
    .map((_v, idx) => idx)
  const shuffle = []
  const boardData = []

  while (candidates.length > size * size - mineCount) {
    const chosen = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0]
    shuffle.push(chosen)
  }

  for (let i = 0; i < size; i++) {
    const rowData = Array(size).fill(CODES.INIT)
    boardData.push(rowData)
  }

  for (let i = 0; i < shuffle.length; i++) {
    const row = Math.floor(shuffle[i] / size)
    const col = shuffle[i] % size
    boardData[row][col] = CODES.MINE
  }

  return boardData
}

export interface InitialState {
  gameState: string
  boardData: (number | string)[][]
  mineCount: number
  flagCount: number
  openedCellCount: number
}

export const initialState = {
  gameState: GAMES.PLAY,
  boardData: initBoard(SIZE, 8),
  mineCount: 8,
  flagCount: 0,
  openedCellCount: 0,
}

export interface Action {
  type: string
  row?: number
  col?: number
}

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case 'SET_GAME':
      return initialState

    case 'OPEN_CELL':
      return produce(state, (draft) => {
        if (action.row === undefined || action.col === undefined) return state
        const code = state.boardData[action.row][action.col]

        switch (code) {
          case CODES.MINE: {
            draft.gameState = GAMES.LOSE
            break
          }
          case CODES.INIT: {
            const expandResult = openCell(draft.boardData, action.row, action.col)
            draft.boardData = expandResult.boardData
            draft.openedCellCount += expandResult.openedCellCount
            if (draft.openedCellCount + draft.mineCount === SIZE * SIZE) {
              draft.gameState = GAMES.WIN
            }
            break
          }
          default:
            return state
        }
      })

    case 'SET_FLAG':
      return produce(state, (draft) => {
        if (action.row === undefined || action.col === undefined) return
        const code = state.boardData[action.row][action.col]

        switch (code) {
          case CODES.FLAG: {
            draft.boardData[action.row][action.col] = CODES.INIT
            draft.flagCount -= 1
            break
          }
          case CODES.MINE: {
            if (draft.flagCount === draft.mineCount) break
            draft.boardData[action.row][action.col] = CODES.MINE_FLAG
            draft.flagCount += 1
            break
          }
          case CODES.MINE_FLAG: {
            draft.boardData[action.row][action.col] = CODES.MINE
            draft.flagCount -= 1
            break
          }
          case CODES.INIT: {
            if (draft.flagCount === draft.mineCount) break
            draft.boardData[action.row][action.col] = CODES.FLAG
            draft.flagCount += 1
            break
          }
        }
      })
    default:
      return state
  }
}

export { reducer }
