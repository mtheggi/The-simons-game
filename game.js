var btnsArrayColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

function playSound(name) {
  var ss = new Audio("./sounds/" + name + ".mp3");
  ss.play();
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $(".level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(btnsArrayColors[randomNumber]);
  $("#" + btnsArrayColors[randomNumber])
    .fadeOut(100)
    .fadeIn(100);
  playSound(btnsArrayColors[randomNumber]);
}

function restartGame() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
  $(".level-title").text("Game over , Press any key to start!");
}
$(".btn").click(function (event) {
  userClickedPattern.push(event.target.id);
  playSound(event.target.id);
  $("#" + event.target.id).addClass("pressed");
  setTimeout(() => {
    $("#" + event.target.id).removeClass("pressed");
  }, 400);
  checkanswer(userClickedPattern.length - 1);
});
function checkanswer(currentCount) {
  if (gamePattern[currentCount] === userClickedPattern[currentCount]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    restartGame();
  }
}

$(document).keypress(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});
