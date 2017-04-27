export default class Cell {
  // 'initial' bool determines whether cell is being initialised or iterated
  // 'random' bool determines whether cell value is randomly allocated or not
  constructor(row, col, initial, random, density, boardArr, prevValue) {
    this.row = row;
    this.col = col;
    this.value = initial ? this.setInitialValue(random, density) : this.setNextValue(boardArr, prevValue);
  }

  // set initial value - the lower the density, the higher the chance of returning a 0
  // if the random setting is not applied, set every cell value to 0
  setInitialValue(random, density) {
    if (!random) return 0;
    else if (density === 'low') return Math.round(Math.random() / 1.7);
    else if (density === 'mid') return Math.round(Math.random() / 1.3);
    else if (density === 'high') return Math.round(Math.random() / 1);
    return 0;
  }

  // calculate the number of living neighbours in the surrounding cells
  calculateNeighbours(boardArr) {
    const row = this.row;
    const col = this.col;

    const neighbours = [
      [row-1, col-1], [row-1, col], [row-1, col+1],
      [row, col-1],                 [row, col+1],
      [row+1, col-1], [row+1, col], [row+1, col+1]
    ];

    let count = 0;

    neighbours.forEach(cell => {
        if (boardArr[cell[0]] === undefined || boardArr[cell[1]] === undefined) count += 0;
        else if (boardArr[cell[0]][cell[1]].value === 1) count += 1;
    });

    return count;
  }

  // set the value of the cell for the next iteration of the board
  setNextValue(boardArr, prevValue) {
    const neighbourCount = this.calculateNeighbours(boardArr);

    if (prevValue === 1) {
      if (neighbourCount === 2 || neighbourCount === 3) return 1;
      else return 0;
    }
    else if (prevValue === 0) {
      if (neighbourCount === 3) return 1;
      else return 0;
    }
  }

  // toggle cell value between 0 and 1
  toggleValue() {
    this.value = this.value === 0 ? 1 : 0;
  }
};
