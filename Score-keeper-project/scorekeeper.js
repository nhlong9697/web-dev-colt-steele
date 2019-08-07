console.log("connected");
var p1Button = document.querySelector("#p1");
var p2Button = document.getElementById("p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var resetButton = document.querySelector("#reset");
var numInput = document.querySelector("input");
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScoreDisplay = document.querySelector("p span")
var winningScore = 5;
//change score when player 2 win a round
p1Button.addEventListener("click", function () {
  if (!gameOver) {
    //change score when player 1's score is below winning score
    p1Score++;
    if (p1Score === winningScore) {
      //change winning status of player 1
      p1Display.classList.add("winner");
      gameOver = true;
    }
    //change displayed score of player 1
    p1Display.textContent = p1Score;
  }
  
});
//change score when player 2 win a round
p2Button.addEventListener("click", function () {
  if (!gameOver) {
    //change score when player 2's score is below winning score
    p2Score++;
    if (p2Score === winningScore) {
      //change winning status of player 2
      p2Display.classList.add("winner");
      gameOver = true;
    }
    //change displayed score of player 2
    p2Display.textContent = p2Score;
  }
});
//set reset button behavior
resetButton.addEventListener("click", reset);
//change winning score funcion
numInput.addEventListener("change", function() {
  //reset values to 0 when changing winning score
  reset();
  //change winning score
  winningScoreDisplay.textContent = this.value;
  winningScore = Number(this.value);
});
//reset score when players click reset
function reset() {
  p1Score = 0;
  p2Score = 0;
  //remove winner class from winner when reset
  p1Display.classList.remove("winner");
  p2Display.classList.remove("winner");
  //set scoreboard to 0
  p1Display.textContent = p1Score;
  p2Display.textContent = p2Score;
  gameOver = false;
}
