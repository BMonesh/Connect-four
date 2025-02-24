document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const result = document.querySelector('#result');
  const displayCurrentPlayer = document.querySelector('#current-player');
  const resetButton = document.querySelector('#reset-btn');
  let currentPlayer = 1;

  
  for (let i = 0; i < 49; i++) {
    const cell = document.createElement('div');
    grid.appendChild(cell);
  }

  const squares = document.querySelectorAll('.grid div');

  const winningArrays = [
    // horizontal, vertical, diagonal winning patterns...
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
    [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
    [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
    [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
    [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
    [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
    [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
    [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
    [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
    [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24],
    [10, 16, 22, 28], [11, 17, 23, 29], [12, 18, 24, 30], [13, 19, 25, 31],
    [17, 23, 29, 35], [18, 24, 30, 36], [19, 25, 31, 37], [20, 26, 32, 38],
    [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27]
  ];

  function checkBoard() {
    for (let y = 0; y < winningArrays.length; y++) {
      const [a, b, c, d] = winningArrays[y];
      const [square1, square2, square3, square4] = [squares[a], squares[b], squares[c], squares[d]];
      console.log(square1, square2, square3, square4)
      if (
        square1.classList.contains('player-one') &&
        square2.classList.contains('player-one') &&
        square3.classList.contains('player-one') &&
        square4.classList.contains('player-one')
      ) {
        result.innerHTML = 'Player One Wins!';
        disableBoard();
      } else if (
        square1.classList.contains('player-two') &&
        square2.classList.contains('player-two') &&
        square3.classList.contains('player-two') &&
        square4.classList.contains('player-two')
      ) {
        result.innerHTML = 'Player Two Wins!';
        disableBoard();
      }
    }
  }

  function disableBoard() {
    squares.forEach(square => (square.style.pointerEvents = 'none'));
  }

  squares.forEach((square, i) => {
    square.onclick = () => {
      if (result.textContent === '') {  // Check only if no winner is declared
        if (squares[i + 7]?.classList.contains('taken') || i >= 42) {
          if (!square.classList.contains('taken')) {
            square.classList.add('taken', currentPlayer === 1 ? 'player-one' : 'player-two');
            checkBoard();  // Check for a winner immediately after placing the piece
            if (result.textContent === '') {  // Switch player only if no win
              currentPlayer = currentPlayer === 1 ? 2 : 1;
              displayCurrentPlayer.textContent = `Player ${currentPlayer}`;
              displayCurrentPlayer.style.color = currentPlayer === 1 ? 'red' : 'blue';
            }
          }
        } else {
          alert('Invalid move!');
        }
      }
    };
  });
  
  

  resetButton.onclick = () => {
    squares.forEach(square => {
      square.className = '';
    });
    result.textContent = '';
    currentPlayer = 1;
    displayCurrentPlayer.textContent = 'Player 1';
    displayCurrentPlayer.style.color = 'red';
  };
});
