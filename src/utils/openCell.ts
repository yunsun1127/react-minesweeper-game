/* eslint-disable @typescript-eslint/no-explicit-any */
import { CODES } from '../constants'

export const openCell = (boardData: (number | string)[][], row: number, col: number) => {
  let openedCellCount = 0

  const getMineCount = (row: number, col: number) => {
    let aroundCode: any[] = []
    let mineCount = 0

    aroundCode = boardData[row - 1]
      ? aroundCode.concat(boardData[row - 1][col - 1], boardData[row - 1][col], boardData[row - 1][col + 1])
      : aroundCode
    aroundCode = aroundCode.concat(boardData[row][col - 1], boardData[row][col + 1])
    aroundCode = boardData[row + 1]
      ? aroundCode.concat(boardData[row + 1][col - 1], boardData[row + 1][col], boardData[row + 1][col + 1])
      : aroundCode

    mineCount = aroundCode.filter((v) => [CODES.MINE, CODES.MINE_FLAG].includes(v)).length

    return mineCount
  }

  const searchNearCode = (row: number, col: number) => {
    if (boardData[row][col] !== CODES.INIT) {
      return
    }

    boardData[row][col] = getMineCount(row, col)
    openedCellCount++

    let aroundPoint: any[] = []
    aroundPoint = boardData[row - 1]
      ? aroundPoint.concat({ col: col - 1, row: row - 1 }, { col, row: row - 1 }, { col: col + 1, row: row - 1 })
      : aroundPoint
    aroundPoint = aroundPoint.concat({ col: col - 1, row }, { col: col + 1, row })
    aroundPoint = boardData[row + 1]
      ? aroundPoint.concat({ col: col - 1, row: row + 1 }, { col, row: row + 1 }, { col: col + 1, row: row + 1 })
      : aroundPoint

    if (boardData[row][col] === 0) {
      aroundPoint.forEach((point) => {
        searchNearCode(point.row, point.col)
      })
    }
  }

  searchNearCode(row, col)

  return { boardData, openedCellCount }
}
