var numSquares = 9;
var colors = [];
var squares = document.querySelectorAll(".square");
var pickedColor;
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var modeButtons = document.querySelectorAll(".modeButtons");

init();

function init() {
  setupModeButton();
  setupSquares();
  reset();
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    //set color for each square
    //add click listener to square
    squares[i].addEventListener("click", function() {
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //compare color to picked color
      if (clickedColor === pickedColor) {
        //if pick correct congrats player and ask to play again
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        //change all squares to correct colors
        changeColors(clickedColor);
        //change h1 background to correct colors
        h1.style.background = clickedColor;
      }
      else {
        //if pick wrong color hide wrong square and say try again
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
  reset(); 
}

function setupModeButton() {
  for (var i = 0; i < modeButtons.length; i++) {
    //loop through each mode button
    modeButtons[i].addEventListener("click", function(){
      //clear selected class from all buttons
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      //add selected class for selected buttons
      this.classList.add("selected");
      //select easy or hard mode
      if (this.textContent === "Easy") {
        numSquares = 3;
      }
      else if (this.textContent === "Medium") {
        numSquares = 6;
      }
      else {
        numSquares = 9;
      }
      reset();
    });
  }
}

function reset() {
  //empty message
  messageDisplay.textContent = "";
  //reset the reset button to New Colors
  resetButton.textContent = "New Colors";
  //reset all squares to random color
  colors = generateRandomColors(numSquares);
  //reset picked color
  pickedColor = pickColor();
  //display rgb of picked color;
  colorDisplay.textContent = pickedColor;
  //display reset color squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
    }
    else {
      squares[i].style.display = "none";
    }
  }
  //change h1 back to background color
  h1.style.backgroundColor = "steelblue";
}
/* easyButton.addEventListener("click", function() {
  easyButton.classList.add("selected");
  hardButton.classList.remove("selected");
  numSquares = 3;
  colors =generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
    }
    else {
      squares[i].style.display = "none"; 
    }
  } 
});

hardButton.addEventListener("click", function() {
  hardButton.classList.add("selected");
  easyButton.classList.remove("selected");
  numSquares = 6;
  colors =generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].style.display = "block"; 
  } 
}); */

resetButton.addEventListener("click", reset);
//display rgb value of picked color
function changeColors(color) {
  //loop through all squares
  for (i = 0; i < squares.length; i++) {
    //change each color through match given color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  //generate a random answer color
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //make an array
  var arr = []
  //add num random colors to arry
  for (i = 0; i < num; i++) {
    arr[i] = randomColors();
  }
  //return that array
  return arr;
}

//generate random colors
function randomColors() {
  //random red value from 0-255
  var r = Math.floor(Math.random() * 256);
  //random green value from 0-255
  var g = Math.floor(Math.random() * 256);
  //random blue value from 0-255
  var b = Math.floor(Math.random() * 256);
  //return rgb value
  return "rgb(" + r + ", " + g + ", " + b + ")"
}

