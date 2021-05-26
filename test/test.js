// var assert = require('assert');  require wouldn't work on html. only worked in terminal

// var chai = require ('chai');  // same reason as above. needed for terminal but won't work for html.

var expect = chai.expect;
const checkWinner = (currentPlayer, x, y, allCells) => {
  let total = 0;
  allCells.forEach( row => {
    row.forEach( cell => {
      if (cell !== 0) {
        total ++;
      }
    } )
  } );
  // console.log('total', total)

  let maxCol = allCells[0].length - 1;
  let maxRow = allCells.length - 1;
  // console.log(maxCol, maxRow, currentPlayer, x, y)   // 6, 5
  let count = 0;

  // check rows
  for (let col = 0; col <= maxCol; col++) {
    allCells[x][col] === currentPlayer ? count++ : count = 0;
    let output = checkCount(count, currentPlayer, total);
    // console.log('output:', count, output)
    if (output !== undefined){
      return output;
    }
  }

  // check cols
  count = 0;
  for (let row = 0; row <= maxRow; row++) {
    allCells[row][y] === currentPlayer ? count++ : count = 0;
    let output = checkCount(count, currentPlayer, total);
    // console.log('output:', count, output)
    if (output !== undefined){return output;};
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

    let output = checkCount(count, currentPlayer, total);
    // console.log('output:', count, output)
    if (output !== undefined){return output;};
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

    let output = checkCount(count, currentPlayer, total);
    // console.log('output:', count, output)
    if (output !== undefined){return output;};
  }
  if (total === 42) {
    return 'Tie!';
  }
  return 'No Winner!';
}

const checkCount = (count, currentPlayer, total) => {
  // console.log(count, currentPlayer, total)
  if (count >=4) {
    if (currentPlayer === 'x') {
      return 'X Win!';
    } else if (currentPlayer === 'y') {
      return 'Y Win!';
    }
  }

  // return 'No Winner!';
}

const cellsRow = [
  [0, 0, 'x', 'x', 'x', 'x', 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 'y', 'y', 'y', 'y'],
  [0, 0, 0, 0, 0, 0, 0]
];

const cellsCol = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 'y'],
  [0, 'x', 0, 0, 0, 0, 'y'],
  [0, 'x', 0, 0, 0, 0, 'y'],
  [0, 'x', 0, 0, 0, 0, 'y'],
  [0, 'x', 0, 0, 0, 0, 0]
];

const cellsMajor = [
  [0, 0, 0, 'x', 0, 0, 0],
  [0, 0, 'x', 0, 0, 'y', 0],
  [0, 'x', 0, 0, 'y', 0, 0],
  ['x', 0, 0, 'y', 0, 0, 0],
  [0, 0, 'y', 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

const cellsMinor = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 'x', 0, 0, 0],
  [0, 'y', 0, 0, 'x', 0, 0],
  [0, 0, 'y', 0, 0, 'x', 0],
  [0, 0, 0, 'y', 0, 0, 'x'],
  [0, 0, 0, 0, 'y', 0, 0]
];

const cellsTie = [
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['x', 'y', 'x', 'y', 'x', 'y', 'x'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'x'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'x']
];

const cellsTieWinR = [
  ['x', 'x', 'x', 'x', 'y', 'x', 'y'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['x', 'y', 'x', 'y', 'x', 'y', 'x'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'x'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'x']
];

const cellsFullWinC = [
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['x', 'y', 'x', 'y', 'x', 'y', 'y'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'x'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'x']
];

const cellsTieWinMaD = [
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'x'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['x', 'y', 'x', 'y', 'x', 'y', 'x'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'x'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'x']
];

const cellsTieWinMiD = [
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['y', 'y', 'y', 'x', 'y', 'x', 'y'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'y'],
  ['x', 'y', 'x', 'y', 'x', 'y', 'x'],
  ['y', 'x', 'y', 'y', 'y', 'x', 'x'],
  ['y', 'x', 'y', 'x', 'y', 'x', 'x']
];

describe('Connect Four in a row', function() {
    it('should return true when x wins a row', function() {
      let result = checkWinner('x', 0, 3, cellsRow)
      // assert.equal(result, 'X Win!');
      expect(result).to.equal('X Win!');
    });
    it('should return true when no one x wins a row', function() {
      let result = checkWinner('x', 1, 6, cellsRow)
      // assert.equal(result, 'No Winner!');
      expect(result).to.equal('No Winner!');
    });
    it('should return true when y wins a row', function() {
      let result = checkWinner('y', 4, 6, cellsRow)
      // assert.equal(result, 'Y Win!');
      expect(result).to.equal('Y Win!');
    });
    it('should return true when no one y wins a row', function() {
      let result = checkWinner('y', 5, 3, cellsRow)
      // assert.equal(result, 'No Winner!');
      expect(result).to.equal('No Winner!');
    });
});

describe('Connect Four in a column', function() {
  it('should return true when x wins a row', function() {
    let result = checkWinner('x', 3, 1, cellsCol)
    // assert.equal(result, 'X Win!');
    expect(result).to.equal('X Win!');
  });
  it('should return true when no one x wins a row', function() {
    let result = checkWinner('x', 3, 2, cellsCol)
    // assert.equal(result, 'No Winner!');
    expect(result).to.equal('No Winner!');
  });
  it('should return true when y wins a row', function() {
    let result = checkWinner('y', 1, 6, cellsCol)
    // assert.equal(result, 'Y Win!');
    expect(result).to.equal('Y Win!');
  });
  it('should return true when no one y wins a row', function() {
    let result = checkWinner('y', 1, 5, cellsCol)
    // assert.equal(result, 'No Winner!');
    expect(result).to.equal('No Winner!');
  });
});

describe('Connect Four in a Major Diagonal', function() {
  it('should return true when x wins a row', function() {
    let result = checkWinner('x', 0, 3, cellsMajor)
    // assert.equal(result, 'X Win!');
    expect(result).to.equal('X Win!');
  });
  it('should return true when no one x wins a row', function() {
    let result = checkWinner('x', 0, 4, cellsMajor)
    // assert.equal(result, 'No Winner!');
    expect(result).to.equal('No Winner!');
  });
  it('should return true when y wins a row', function() {
    let result = checkWinner('y', 4, 2, cellsMajor)
    // assert.equal(result, 'Y Win!');
    expect(result).to.equal('Y Win!');
  });
  it('should return true when no one y wins a row', function() {
    let result = checkWinner('y', 5, 2, cellsMajor)
    // assert.equal(result, 'No Winner!');
    expect(result).to.equal('No Winner!');
  });
});

describe('Connect Four in a Minor Diagonal', function() {
  it('should return true when x wins a row', function() {
    let result = checkWinner('x', 2, 4, cellsMinor)
    // assert.equal(result, 'X Win!');
    expect(result).to.equal('X Win!');
  });
  it('should return true when no one x wins a row', function() {
    let result = checkWinner('x', 1, 4, cellsMinor)
    // assert.equal(result, 'No Winner!');
    expect(result).to.equal('No Winner!');
  });
  it('should return true when y wins a row', function() {
    let result = checkWinner('y', 5, 4, cellsMinor)
    // assert.equal(result, 'Y Win!');
    expect(result).to.equal('Y Win!');
  });
  it('should return true when no one y wins a row', function() {
    let result = checkWinner('y', 4, 4, cellsMinor)
    // assert.equal(result, 'No Winner!');
    expect(result).to.equal('No Winner!');
  });
});

describe('Connect Four when Tie', function() {
  it('should return true when Tie', function() {
    let result = checkWinner('x', 0, 6, cellsTie)
    // assert.equal(result, 'Tie!');
    expect(result).to.equal('Tie!');
  });
  it('should return true when board full but x wins a row', function() {
    let result = checkWinner('x', 0, 6, cellsTieWinR)
    // assert.equal(result, 'Tie!');
    expect(result).to.equal('X Win!');
  });
  it('should return true when board full but y wins a column', function() {
    let result = checkWinner('y', 0, 6, cellsFullWinC)
    // assert.equal(result, 'Tie!');
    expect(result).to.equal('Y Win!');
  });
  it('should return true when board full but x wins a Major Diagonal', function() {
    let result = checkWinner('y', 1, 6, cellsTieWinMaD)
    // assert.equal(result, 'Tie!');
    expect(result).to.equal('Tie!');
  });
  it('should return true when board full but y wins a Minor Diagonal', function() {
    let result = checkWinner('x', 0, 0, cellsTieWinMiD)
    // assert.equal(result, 'Tie!');
    expect(result).to.equal('Tie!');
  });
});



// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

// describe('Call Function', function() {
//   describe('calling function done()', function() {
//     it('should call function done() immediately once', function(done) {
//         // Calling `done()` twice is an error
//         setImmediate(done);
//         setImmediate(done);
//     });
//   });
// });

// describe('Foobar', function() {
//   describe('#sayHello()', function() {
//     it('should return failing', function() {
//       var foobar = {
//         sayHello: function() {
//           return 'Hello World!';
//         }
//       };
//       assert(foobar.sayHello() === 'funky chicken');
//     })

//     it('should return passing', function() {
//       var foobar = {
//         sayHello: function() {
//           return 'funky chicken';
//         }
//       };
//       assert(foobar.sayHello() === 'funky chicken');
//     })
//   })
// })