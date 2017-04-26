import React, { Component } from 'react';

import Cell from './cell';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardArr: null,
      canvasWidth: 650,
      canvasHeight: 650,
      numRows: 100,
      numCols: 100,
      cellWidth: null,
      cellHeight: null,
      density: 'high',
      playing: false,
      timer: null,
      iterations: 0,
    };
  }

  // initialise canvas and board array configuration when component mounts
  componentDidMount() {
    this.defineDimensions(this.state.canvasWidth, this.state.canvasHeight, this.state.numRows, this.state.numCols);
    this.setBoardArray(this.state.numRows, this.state.numCols, true, true, 'high');
    this.playPause();
  }

  // redraw canvas following state updates
  componentDidUpdate() {
    this.drawCells();
  }

  // configure board array
  setBoardArray(width, height, initial, random, density) {
    const boardArr = [];

    for (let i = 0; i < height; i++) {
      const row = [];

      for (let j = 0; j < width; j++) {
        const cell = new Cell(i, j, true, random, density);
        row.push(cell);
      }

      boardArr.push(row);
    }

    this.setState({ boardArr });
  }

  // set constants for canvas dimensions
  defineDimensions(canvasWidth, canvasHeight, numCols, numRows) {
    const cellWidth = canvasWidth / numCols;
    const cellHeight = canvasHeight / numRows;
    this.setState({ canvasWidth, canvasHeight, cellWidth, cellHeight })
  }

  // update the board array with new cells
  iterate() {
    const boardArr = this.state.boardArr.map(row => {
      return row.map(cell => {
        const newCell = new Cell(cell.row, cell.col, false, false, null, this.state.boardArr, cell.value);
        return newCell;
      });
    });
    this.setState({ boardArr });
    // this.setState({ iterations: this.state.iterations + 1 });
  }

  playPause() {
    if (!this.state.playing) {
      const intervalTimer = setInterval(() => {
        this.iterate();
      }, 20);
      this.setState({ playing: true });
      this.setState({ timer: intervalTimer });
    }
    else {
      clearInterval(this.state.timer);
      this.setState({ playing: false });
      this.setState({ timer: null });
    }
  }

  // draw the canvas
  drawCells() {
    if (!this.state.boardArr) return '';

    const { cellWidth, cellHeight } = this.state;

    this.state.boardArr.forEach(row => {
      row.forEach(cell => {
        const ctx = this.refs.canvas.getContext('2d');

        ctx.fillStyle = cell.value === 1 ? 'red' : 'white';
        ctx.fillRect(cellWidth * cell.col, cellHeight * cell.row, cellWidth, cellHeight);

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.7;
        ctx.strokeRect(cellWidth * cell.col, cellHeight * cell.row, cellWidth, cellHeight);
      });
    });
  }

  // toggle value of cell
  toggleCellValue(row, col) {
    const boardArr = [...this.state.boardArr];
    const cell = boardArr[row][col];
    cell.value = cell.value === 0 ? 1 : 0;

    this.setState({ boardArr });
  }

  // determine mouse coords in relation to canvas, translate to row, col and toggle cell value
  handleCanvasClick(e) {
    const rect = this.refs.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { cellWidth, cellHeight } = this.state;
    const row = (Math.floor(y / cellHeight));
    const col = (Math.floor(x / cellWidth));

    this.toggleCellValue(row, col);
  }

  newBoard(random, density) {
    // width, height, initial, random, density
    this.setState({ playing: false, timer: null });
    this.setBoardArray(this.state.numRows, this.state.numCols, true, random, density);
  }

  render() {
    return(
      <div>
        <button className="btn btn-default" onClick={() => this.playPause()}>Play/Pause</button>
        <button className="btn btn-default" onClick={() => this.newBoard(true, 'low')}>Low</button>
        <button className="btn btn-default" onClick={() => this.newBoard(true, 'mid')}>Mid</button>
        <button className="btn btn-default" onClick={() => this.newBoard(true, 'high')}>High</button>
        <button className="btn btn-default" onClick={() => this.newBoard(false, null)}>Clear</button>
        <div>{this.state.iterations}</div>
        <canvas
          ref="canvas"
          width={this.state.canvasWidth}
          height={this.state.canvasHeight}
          onClick={(e) => this.handleCanvasClick(e)}
        />
      </div>
    );
  }
};
