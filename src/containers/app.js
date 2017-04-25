import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.setBoardArray(50, 50, true);

  }

  render() {
    if (this.props.boardArr) {
      console.log(this.props.boardArr[5][5]);
      console.log('nextValue', this.props.boardArr[0][9].calculateNextValue(this.props.boardArr));
    }
    return(
      <div>App</div>
    );
  }
};

const mapStateToProps = state => {
  console.log(state.board.boardArr);
  return { boardArr: state.board.boardArr };
};

export default connect(mapStateToProps, actions)(App);
