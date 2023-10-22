// elementi diinteresse
const cellWrapper = dQS(".cell_wrapper");
const pointScore = dQS(".point_score");
const loseGame = dQS(".lose_game");
const winGame = dQS(".win_game");

//informazione per la logica
const totalCell = 100;
const totalBombs = 15;
const maxiScore = totalCell - totalBombs;
const bombList = [];
let score = 0;

const cardCell = () => {
  return `<div class="img_contain">
  <img  class="img_card" src="./assets/cappello-paglia-back-g.png" alt="">
  </div>`;
};
const imgClicked = document.getElementsByClassName("img_cardC");
const imgBomb = dQS(".bomb_card");

//funzioni azioni o riutilizzabili
function dQS(value) {
  let element = document.querySelector(`${value}`);
  return element;
}

function endGame(index) {
  loseGame.classList.remove("hidden"); //cambio classe per mostrare la scermata di fine goco
  console.log("Game terminato");

  bombList.forEach((index) => {
    //itera attraverso la lista delle posizioni delle bombe e cambia il src dell'immagine per ciascuna di esse
    const cell = document.querySelector(`.game_cell:nth-child(${index})`);
    const imgCard = cell.querySelector(".img_card");
    imgCard.src = "./assets/bomb.png";
  });

  console.log("Bomb found at index: " + index);
}
//funzione per il punteggio
function updateScore() {
  score++;
  pointScore.innerText = String(score).padStart(5, 0);
}

////////////////////////////////////////////////

//funzione per creare le bombe con controllo doppio numero logica di gioco
let evenCell = false;
let rowEven = false;

while (bombList.length < totalBombs) {
  //creo delle bombe random
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
  const htmlMarkUp = cardCell(index);
  const cell = document.createElement("div"); //creo tagg
  cell.classList.add("game_cell"); //aggiungo .classe
  cell.innerHTML = htmlMarkUp;
  const image = dQS(".img_card");
  cellColor(index, cell); //call funzione per colorazione celle diverse

  cell.addEventListener("click", function () {
    // funzione per logica click
    const imgCard = cell.querySelector(".img_card");
    if (cell.classList.contains("cell_clicked")) return;

    if (bombList.includes(index)) {
      imgCard.src = "./assets/bomb.png";
      //avvio funzione di apertura modale e termi nagioco
      endGame(index);
    } else {
      imgCard.src = "./assets/cell.png"; //cambio immagine se clicco casella giusta
    }
    if (score === maxiScore) {
      winGame.classList.remove("hidden");
      console.log("hai vinto");
    }
  });
  cellWrapper.appendChild(cell); //in pagina
}

const reloadPage = () => {
  window.location.reload();
};
