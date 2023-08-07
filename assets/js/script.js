//wait for DOM to finish loading  before running game

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    //Use this to iterate through the buttons array - you dont have to use i = 0; i < button.length; i++
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "submit") {
        alert("You clicked submit");
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    });
  }

    runGame("addition");
});

//USE DOCSTRINGS /** */ (DocStrings are used - they are not regular comments. When you over over the function when its called you get the desription of that function - go hover over runGame)

/**
 * the main game "loop", called when the script is first loaded
 * and after the users answer has been processed
 */
function runGame(gameType) {
  //creates random number between 1 and 25
  let num1 = Math.floor(Math.random() * 25 + 1);
    let num2 = Math.floor(Math.random() * 25 + 1);

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else {
        alert(`Unkown game type: ${gameType}`);
        throw `Unkown game type: ${gameType}. Aborting!`;
    }
}

runGame();

function checkAnswer() {}

function calculateCorrectAnswer() {}

function incrementScore() {}

function incrementWrongAnswer() {}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion() {}

function displayMultiplyQuestion() {}
