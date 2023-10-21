// elementi diinteresse
const cellWrapper = dQS(".cell_wrapper");
const pointScore = dQS(".point_score");
const loseGame = dQS(".lose_game");
const winGame = dQS(".win_game");

console.log(cellWrapper);

//informazione per la logica
const totalCell = 100;
const totalBombs = 15;
const maxiScore = totalCell - totalBombs;
const bombList = [];
let score = 0;

//funzioni azioni o riutilizzabili
function dQS(value) {
  let element = document.querySelector(`${value}`);
  return element;
}

function endGame() {
  loseGame.classList.remove("hidden");
  console.log("Game terminato");
}

function updateScore() {
  score++;
  pointScore.innerText = String(score).padStart(5, 0);
}

////////////////////////////////////////////////

//funzione per creare le bombe con controllo doppio numero logica di gioco
let evenCell = false;
let rowEven = false;

while (bombList.length < totalBombs) {
  const number = Math.floor(Math.random() * totalCell) + 1;
  !bombList.includes(number) ? bombList.push(number) : null;
}
console.log(bombList);

function cellColor(index, cell) {
  evenCell = index % 2 === 0; //controllo numero divisibile che restituisce booleano
  if ((rowEven && evenCell) || (!rowEven && !evenCell))
    cell.classList.add("cell_low");

  if (index % 10 === 0) rowEven = !rowEven; //condizione controllo per colore colonne
}

//funzione per stampare in maniera dinamica le celle
for (let index = 1; index <= totalCell; index++) {
  const cell = document.createElement("div"); //creo tagg
  cell.classList.add("game_cell"); //aggiungo .classe
  cell.innerText = index; //aggiungo testo/numero
  cellColor(index, cell); //call funzione per colorazione celle diverse

  cell.addEventListener("click", function () {
    // funzione per logica click
    if (cell.classList.contains("cell_clicked")) return;

    if (bombList.includes(index)) {
      cell.classList.add("cell_bomb");
      //condizione per controllo numero equivalente al numero bomba ed aggiunta classe
      endGame(cell);
    } else {
      cell.classList.add("cell_clicked");

      updateScore(cell);
    }
    if (score === maxiScore) {
      winGame.classList.remove("hidden");
      console.log("hai vinto");
    }
  });
  cellWrapper.appendChild(cell); //in pagina
}
