const grid = document.getElementById('grid');
const msg = document.querySelector('.message');
let mark = 'X';
let cells;

// build grid
for (let i = 1; i <= 9; i++) {
  let cell = document.createElement('li');
  cell.id = 'c' + i;
  cell.addEventListener('click', setMove, false);
  grid.appendChild(cell);
}

cells = document.querySelectorAll('li');

// add click listener to each cell
function setMove(){
  if(this.textContent == ''){
    this.textContent = mark;
    checkRow();
    switchMark();
  }
}

// switch user
function switchMark(){
  if (mark == 'X'){
      mark = 'O';
  }
  else {
      mark = 'X';
  }
}

// determine a winner
function winner(a,b,c){
  if (a.textContent === mark && b.textContent === mark && c.textContent === mark){
    msg.textContent = 'Congratulations ' + mark + ', you are the winner!' + ' Press the Reset button to play again :)';
    a.classList.add('winner');
    b.classList.add('winner');
    c.classList.add('winner');
    msg.classList.add('winner');
    return true;
  }
  else if (a.textContent === mark && b.textContent === mark && c.textContent !== mark) {
    msg.textContent = ' No one wins ^_^ Let\'s play again :)' + ' Press the Reset button to play again :)';
    msg.classList.add('lost');
    return false;
  }
}

function checkSiblings(currentMove){
  const next = Number(currentMove.id + 3);
  const prev = Number(currentMove.id - 3);
  winner(cells[currentMove.id].textContent, cells[next].textContent, cells[prev].textContent);
}

// check cell combinations
function checkRow(){
  winner(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3'));
  winner(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6'));
  winner(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9'));
  winner(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7'));
  winner(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8'));
  winner(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9'));
  winner(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9'));
  winner(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7'));
}

// clear the grid
function reset(){
  mark = 'X';
  for (let i = 0; i < cells.length; i++){
    cells[i].textContent = '';
  }
  msg.classList.remove('winner');
  msg.classList.remove('lost');
  msg.textContent = 'Click a square to mark your spot!';
}

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function(e){
  e.preventDefault();
  reset();
});
