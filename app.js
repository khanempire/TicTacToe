const statusDiv=document.querySelector('.status');
const resetDiv=document.querySelector('.reset');
const cellDivs=document.querySelectorAll('.cell');
const winningMsg=document.querySelector('.winning-message');
const win=document.querySelector('.winner');
const restartDiv=document.querySelector('.restart');
/*const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]*/
//game constraints
const xSymbol='x';
const oSymbol='o';

//game variables
let gameIsLive=true;
let xIsNext=true;

//functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;
const handleWin = (letter) => {
    gameIsLive=false;
    if(letter==='x'){
      winningMsg.innerHTML=`${letterToSymbol(letter)} has won!`;
    }else{
      winningMsg.innerHTML=`<span>${letterToSymbol(letter)} has won!</span>`;
    }
    win.classList.add('show');
};

const checkGameStatus= () => {
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRight = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRight = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRight = cellDivs[8].classList[1];
  
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft); 
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    handleWin(middleLeft);
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    handleWin(bottomLeft);
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft);
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    handleWin(topMiddle);
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight);
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft);
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight);
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    gameIsLive = false;
    winningMsg.innerHTML = 'Game is tied!';
    win.classList.add('show');
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      statusDiv.innerHTML = `${xSymbol} is next`;
    } else {
      statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
    }
  }
};
// event Handlers
const handleReset = () => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    for (const cellDiv of cellDivs) {
      cellDiv.classList.remove('x');
      cellDiv.classList.remove('o');
      cellDiv.classList.remove('won');
    }
    gameIsLive = true;
  };
  const handleRestart = () => {
    xIsNext = true;
    win.classList.remove('show');
    statusDiv.innerHTML = `${xSymbol} is next`;
    for (const cellDiv of cellDivs) {
      cellDiv.classList.remove('x');
      cellDiv.classList.remove('o');
      cellDiv.classList.remove('won');
    }
    gameIsLive = true;
  };
  
  const handleCellClick = (e) => {
    const classList = e.target.classList;
  
    if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
      return;
    }
  
    if (xIsNext) {
      classList.add('x');
      checkGameStatus();
    } else {
      classList.add('o');
      checkGameStatus();
    }
  };
  
  
  // event listeners
  resetDiv.addEventListener('click', handleReset);
  restartDiv.addEventListener('click', handleRestart);
  
  for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick)
  }

