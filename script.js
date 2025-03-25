const diceOptions = [
  { sides: 4, color: "var(--green)" },
  { sides: 6, color: "var(--cyan)" },
  { sides: 8, color: "var(--purple)" },
  { sides: 10, color: "var(--pink)" },
  { sides: 12, color: "var(--red)" },
  { sides: 20, color: "var(--orange)" },
];

let addedDices = [];

function createDice(dice) {
  const diceElement = document.createElement("div");
  diceElement.className = "btn-dice";
  diceElement.style.backgroundColor = dice.color;
  return diceElement;
}

function showAddedDices() {
  const diceDisplay = document.querySelector(".display-content");
  if (!diceDisplay) return;

  diceDisplay.innerHTML = "";
  addedDices.forEach((dice) => {
    const diceElement = createDice(dice);
    diceElement.textContent = dice?.value ?? "";
    diceElement.addEventListener("click", () => {
      removeDice(dice);
    });
    diceDisplay.appendChild(diceElement);
  });
}

function addDice(dice) {
  const diceWithId = { ...dice, id: Date.now() };
  addedDices.push(diceWithId);
  showAddedDices();
}

function removeDice(dice) {
  addedDices = addedDices.filter((d) => d.id !== dice.id);
  showAddedDices();
}

function showDiceOptions() {
  const optionsContainer = document.querySelector(".options-container");

  diceOptions.forEach((option) => {
    const diceElement = createDice(option);
    diceElement.textContent = `d${option.sides}`;
    diceElement.addEventListener("click", () => {
      addDice(option);
    });
    if (optionsContainer) optionsContainer.appendChild(diceElement);
  });
}

function rollDices() {
  if (!addedDices.length) return;
  const resultElement = document.querySelector("#total");

  addedDices.forEach((dice) => {
    const value = Math.floor(Math.random() * dice.sides) + 1;
    dice.value = value;
  });

  const result = addedDices.reduce((acc, dice) => acc + dice.value, 0);
  resultElement.textContent = result;

  showAddedDices();
}

showDiceOptions();
