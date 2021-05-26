import React from 'react';
import './App.css';
import Cell from './Cell.jsx';
import Button from './Button.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: '',
      move: 0,
      xWin: false,
      yWin: false,
      tie: false,
      xWinRounds: 0,
      yWinRounds: 0,
      tieRound: 0,
      cells: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      cellClasses: [
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'],
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'],
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'],
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'],
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'],
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell']
      ]
    };
  }


  clickPlay (e) {
    // console.log(e.target.dataset.x);
    // console.log(this.state);

    if (this.state.xWin || this.state.yWin || this.state.tie) {
      // $("#gameOver").removeClass();
      // $("#gameOver").addClass('gameOver');
      $("#gameRestart").removeClass();
      $("#gameRestart").addClass('gameRestart');
      $("#gameRestart").text('Game is over! Reset the game and try one more time!!!');
      // alert('Game is over! Reset the game and try one more time')
    } else {
      let currentPlayer;
      let move = this.state.move + 1;
      if (this.state.player === '') {
        currentPlayer = 'x';
        // this.setState({cells[5][e.target.dataset.x]: 'x'});
      } else if (this.state.player === 'x') {
        currentPlayer = 'y';
      } else {
        currentPlayer = 'x';
      }

      this.playBoard(e.target.dataset.x, currentPlayer, move);
      // this.checkWinner();
    }
  }

  findRow(col) {
    let colReversed = [];
    for (let row = this.state.cells.length - 1; row >= 0; row--) {
      if (this.state.cells[row][col] === 0) {
        return row;
      }
    }
  }

  playBoard(col, currentPlayer, move) {
    $("#gameOver").removeClass();
    $("#gameOver").text('');
    let rowToPlay = this.findRow(col);
    if (rowToPlay === undefined) {
      $("#gameOver").addClass('gameOver');
      $("#gameOver").text('Try another column!!!');
      return;
    }
    let cells = [...this.state.cells];
    let cellRow = [...cells[rowToPlay]];
    cellRow[col] = currentPlayer;
    cells[rowToPlay] = cellRow;
    // console.log('new cells: ', cells);

    let cellClasses = [...this.state.cellClasses];
    let cellClassesRow = [...cellClasses[rowToPlay]];
    cellClassesRow[col] = 'cell'+currentPlayer;
    cellClasses[rowToPlay] = cellClassesRow;

    this.setState({
      player: currentPlayer,
      cellClass: 'cell'+currentPlayer,
      isOn: !this.state.isOn,
      move: move,
      cells: cells,
      cellClasses: cellClasses
    }, () => {
      if (this.state.move > 6) {
        this.checkWinner(currentPlayer, rowToPlay, Number(col));
      }
    });
    // console.log(this.state);
  }

  checkWinner(currentPlayer, x, y) {
    let allCells = this.state.cells;
    let maxCol = allCells[0].length - 1;
    let maxRow = allCells.length - 1;
    console.log(maxCol, maxRow, currentPlayer, x, y)   // 6, 5
    let count = 0;

    // check rows
    for (let col = 0; col <= maxCol; col++) {
      allCells[x][col] === currentPlayer ? count++ : count = 0;
      this.checkCount(count, currentPlayer);
    }

    // check cols
    count = 0;
    for (let row = 0; row <= maxRow; row++) {
      allCells[row][y] === currentPlayer ? count++ : count = 0;
      this.checkCount(count, currentPlayer);
    }

    // check majorDiagonal
    count = 0;
    for (let num = 0; num <= Math.max(maxRow, maxCol); num++) {
      if ((y - x) >= 0) {
        if (num+y-x > maxCol || num > maxRow) {
          break;
        }
        allCells[num][num+y-x] === currentPlayer ? count++ : count = 0;
      } else {
        if (num-y+x > maxRow || num > maxCol) {
          break;
        }
        allCells[num-y+x][num] === currentPlayer ? count++ : count = 0;
      }

      this.checkCount(count, currentPlayer);
    }

    // check minorDiagonal
    count = 0;
    for (let num = 0; num <= Math.max(maxRow, maxCol); num++) {
      if ((y + x) >= 3 && (y + x) <= 6) {
        if (y+x-num < 0 || num > maxRow) {
          break;
        }
        allCells[num][y+x-num] === currentPlayer ? count++ : count = 0;
      } else if ((y + x) > 6 && (y + x) <= 8) {
        if (num+y+x-maxCol > maxRow || maxCol-num < 0) {
          break;
        }
        allCells[num+y+x-maxCol][maxCol-num] === currentPlayer ? count++ : count = 0;
      }

      this.checkCount(count, currentPlayer);
    }

    // check tie/fullboard wo winner
    if (this.state.move === 42) {
      $("#gameOver").removeClass();
      $("#gameOver").addClass('gameOver');
      $("#gameOver").text('Tie! Reset the game and try one more time!!!');
      let round = this.state.tieRound + 1;
      this.setState({tie: true, tieRound: round});
      // setTimeout(() => {
      //   alert ('Tie! Reset the game and try one more time!');
      // });
    }

  }

  checkCount (count, currentPlayer) {
    if (count >=4) {
      console.log('win!!!')
      if (currentPlayer === 'x') {
        $("#gameOver").addClass('gameOverGreen');
        $("#gameOver").text('Green win!!!');
        let round = this.state.xWinRounds + 1;
        this.setState({xWin: true, xWinRounds: round });
        // this.setState({xWin: true }, alert ('Green win!'));
      } else {
        $("#gameOver").addClass('gameOverGold');
        $("#gameOver").text('Gold win!!!');
        let round = this.state.yWinRounds + 1;
        this.setState({yWin: true, yWinRounds: round  });
        // this.setState({yWin: true }, alert ('Gold win!'));
        }
      return;
    }
  }

  resetGame(){
    $("#gameOver").removeClass();
    $("#gameRestart").removeClass();
    // $("#gameOver").addClass('gameOver');
    $("#gameOver").text('');
    $("#gameRestart").text('');
    this.setState({
      player: '',
      move: 0,
      xWin: false,
      yWin: false,
      tie: false,
      cells: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      cellClasses: [
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'],
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'],
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'],
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'],
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell'],
        ['cell', 'cell', 'cell', 'cell', 'cell', 'cell', 'cell']
      ]
    });
  }

  render() {
    return (
      <div className="game">
        <div className="titleTop">
          <h1 className="title">Connect Four</h1>
          <div className="scoreBoard">
            <p className="scoreBoardGreen">{`Green Win: ${this.state.xWinRounds}`}</p>
            <p className="scoreBoardGold">{`Gold Win: ${this.state.yWinRounds}`}</p>
            <p className="scoreBoardTie">{`Tie: ${this.state.tieRound}`}</p>
          </div>
          <button className="resetBtn" onClick={this.resetGame.bind(this)}>Restart Game</button>
        </div>
        <div className="play">
          {
            this.state.cells[0].map( (cell, index) => {
                return <Button key = {index} x={index} clickPlay={this.clickPlay.bind(this)} />
            } )
          }
        </div>
        <div className="board">
          {
            this.state.cells.map( (row, rowIndex) => {
              return row.map( (col, colIndex) => {
                return <Cell key={rowIndex+colIndex} x={colIndex} y={rowIndex} cellClass={this.state.cellClasses[rowIndex][colIndex]} />
              } )
            } )
          }
        </div>
        <p id="gameOver"></p>
        <p id="gameRestart"></p>
      </div>

    );
  }
  // render() {
  //   return (
  //     <div className="game">
  //       <h1 className="title">Connect Four <button className="resetBtn" onClick={this.resetGame.bind(this)}>Reset Game</button></h1>
  //       <div className="play">
  //         {
  //           this.state.cells[0].map( (cell, index) => {
  //               return <Button key = {index} x={index} clickPlay={this.clickPlay.bind(this)} />
  //           } )
  //         }
  //       </div>
  //       <div className="board">
  //         {
  //           this.state.cells.map( (row, rowIndex) => {
  //             return row.map( (col, colIndex) => {
  //               return <Cell key={rowIndex+colIndex} x={colIndex} y={rowIndex} cellClass={this.state.cellClasses[rowIndex][colIndex]} />
  //             } )
  //           } )
  //         }
  //       </div>
  //       <p>{`Green Win: ${this.state.xWinRounds} Gold Win: ${this.state.yWinRounds} Tie: ${this.state.tieRound}`}</p>
  //       <p id="gameOver"></p>
  //       <p id="gameRestart"></p>
  //     </div>

  //   );
  // }

}

export default App;