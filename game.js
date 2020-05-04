var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function(e) {
var userChosenColour= e.target.id;
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
})




function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
  $("#"+currentColour).removeClass("pressed")
}, 100);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel){
if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
  console.log(gamePattern[currentLevel]);
  console.log(userClickedPattern[currentLevel]);
  console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence,1000);
    }



    }
else{
      console.log("fail");
      console.log(gamePattern[currentLevel]);
      console.log(userClickedPattern[currentLevel]);
      $("#level-title").text("Game Over, Restart ?");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();

    }
}
function startOver(){
  gamePattern=[];
  started = false;
  level = 0;
};
