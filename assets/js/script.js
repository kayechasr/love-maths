//wait for DOM to finish loading  before running game

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    });
  }

  //using the key method allows to make your website keyboard controls. This one allows users to press enter to submit instead of clicking submit button
  document.getElementById("answer-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (document.getElementById("answer-box").value.length > 0) {
        checkAnswer();
      } else {
        alert("Please enter an answer")
      }
    }
  })

  runGame("addition");
});

//USE DOCSTRINGS /** */ (DocStrings are used - they are not regular comments. When you over over the function when its called you get the desription of that function - go hover over runGame)

/**
 * the main game "loop", called when the script is first loaded
 * and after the users answer has been processed
 */
function runGame(gameType) {

  document.getElementById("answer-box").value = " ";
  document.getElementById("answer-box").focus();


  //creates random number between 1 and 25
  let num1 = Math.floor(Math.random() * 25 + 1);
  let num2 = Math.floor(Math.random() * 25 + 1);

  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "multiply") {
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === "subtract") {
    displaySubtractQuestion(num1, num2);
  } else if (gameType === "division") {
    displayDivisionQuestion(num1, num2);
  } else {
    alert(`Unknown game type: ${gameType}`);
    throw `Unknown game type: ${gameType}. Aborting!`;
  }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert("Hey! You are correct");
    incrementScore();
  } else {
    alert(`Awww... you answered ${userAnswer} but the correct answer is ${calculatedAnswer[0]}!`);
    incrementWrongAnswer();
  }

  runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands(numbers) and the operator (plus,minus etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  let operator = document.getElementById("operator").innerText;

  if (operator === "+") {
    return [operand1 + operand2, "addition"];
  } else if (operator === "x") {
    return [operand1 * operand2, "multiply"];
  } else if (operator === "-") {
    return [operand1 - operand2, "subtract"];
  } else if (operator === "/") {
    return [operand1 / operand2, "division"];
  } else {
    alert(`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}. Aborting!`;
  }
}

/**
 * Gets the current score from he DOM and increments it by 1
 */
function incrementScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the tally of incorrect answers from he DOM and increments it by 1
 */
function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
  // if (operand1 < operand2) {
  //   let temp = operand1;
  //   operand1 = operand2;
  //   operand2 = temp;
  // }
  document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2; //Use ternary instead of if statement as above - more cleaner
  document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    // if (operand1 < operand2) {
    //   let temp = operand1;
    //   operand1 = operand2;
    //   operand2 = temp;
    // }

  //Using the below code & Math.ceil to check if the result is a decimal and the rounding it off to a whole number
  let result = operand1 / operand2;

  if (result % 1 != 0) {
    operand1 = operand2 * Math.ceil(result);
  }

  document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2; //Use ternary instead of if statement as above - more cleaner
  document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById("operator").textContent = "/";
}
