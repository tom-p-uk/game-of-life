import * as types from './types';

export const setBoardArray = (width, height, randomiseBoard) => {
  class Cell {
    constructor(row, col, randomiseCell) {
      this.row = row;
      this.col = col;
      this.value = randomiseCell ? Math.round(Math.random()) : 0;
    }

    calculateNeighbours(boardArr) {
      const row = this.row;
      const col = this.col;
      
      const neighbours = [
        [[row - 1, col - 1], [row - 1, col], [row - 1, col + 1]],
        [[row, - 1], [row, col], [row, col + 1]],
        [[row + 1, - 1], [row + 1, col], [row + 1, col + 1]],
      ];

      let count = 0;

      neighbours.forEach(row => {
        row.forEach(cell => {
          if (boardArr[cell[0]] && boardArr[cell[1]] && boardArr[cell[0]][cell[1]].value === 1) count++;
        });
      });

      return count;
    }

    calculateNextValue(boardArr) {
      const neighbourCount = this.calculateNeighbours(boardArr);

      if (this.value === 1) {
        if (neighbourCount >= 2 && neighbourCount <= 3) return 1;
        else return 0;
      }
      else if (this.value === 0) {
        if (neighbourCount === 3) return 1;
        else return 0;
      }
    }

    toggleValue() {
      this.value = 0 ? 1 : 0;
    }
  };

  const boardArr = [];

  for (let i = 0; i < height; i++) {
    const row = [];

    for (let j = 0; j < width; j++) {
      const cell = new Cell(i, j, randomiseBoard);
      row.push(cell);
    }

    boardArr.push(row);
  }

  return { type: types.SET_BOARD_ARRAY, payload: boardArr };
}
