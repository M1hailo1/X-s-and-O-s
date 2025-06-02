const fields = Array.from(document.querySelectorAll(".field"));
const message = document.querySelector(".js-message");
const resultMessage = document.querySelector(".js-message-2");
const restartButton = document.querySelector(".js-restart-button");

let currentFields = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleResults() {
  let roundResult = false;
  for (let i = 0; i < 8; i++) {
    const winCondition = winConditions[i];
    const a = currentFields[winCondition[0]];
    const b = currentFields[winCondition[1]];
    const c = currentFields[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundResult = true;
      break;
    }
  }
  if (roundResult) {
    if (currentPlayer === "X") resultMessage.innerText = "X won";
    else resultMessage.innerText = "O won";
    gameOver = true;
    return;
  }
  if (currentFields.includes("") && roundResult)
    resultMessage.innerText = "No one won";
}

function updateFields(index) {
  currentFields[index] = currentPlayer;
}

function swapPlayer() {
  if (currentPlayer === "X") currentPlayer = "O";
  else currentPlayer = "X";
  message.innerText = `Turn for: ${currentPlayer}`;
}

function isValid(field) {
  if (field.innerHTML === "") return true;
  return false;
}

function fillField(field, index) {
  if (isValid(field) && !gameOver) {
    field.innerHTML = `<img class="icon" src='/Images/${currentPlayer}.svg'>`;
    updateFields(index);
    handleResults();
    swapPlayer();
  }
}

function restartGame() {
  currentFields = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;

  if (currentPlayer === "O") swapPlayer();

  fields.forEach((field) => {
    field.innerHTML = "";
  });

  resultMessage.innerText = "Result";
}

fields.forEach((field, index) => {
  field.addEventListener("click", () => {
    fillField(field, index);
  });
});

restartButton.addEventListener("click", () => {
  restartGame();
});
