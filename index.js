var gamePattern = [];

var userClickedPattern = [];

var cnt = 1;

var first_time = true;

var buttonColours = ["red" , "green" , "blue" , "yellow"];

function nextSequence(){

    var val = Math.floor(Math.random()*4);

    $("h1").html("Level "  + cnt);

    var randomChosenColour = buttonColours[val];
    var temp = "#" + randomChosenColour;

    $(temp).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });

    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    cnt++;
}
function check(num){

    if(num >= gamePattern.length){

      console.log("failed");
      return false;
    }

    for(let i = 0 ;i<userClickedPattern.length ; i++){
      if(gamePattern[i] != userClickedPattern[i]){

        console.log("failed!!!!!");

        return false;
      }
    }

    // userClickedPattern = [];
    // num = 0;
    console.log("success");
    return true;

}

function start(){

    nextSequence();

}


function playSound(name){

  var temp2 = "sounds/" +  name + ".mp3";
  var audio = new Audio(temp2);
  audio.play();
}

function startOver(){

  first_time = true;

 gamePattern = [];

  userClickedPattern = [];

  cnt = 1;

  num = -1;


}

function animatePress(currentColour){

  var temp5 = "." + currentColour;

  $(temp5).addClass("pressed");

  setTimeout(function() {
    $(temp5).removeClass("pressed");
  }, 100);
}

var num = 0;


$(".btn").on("click" , function(event){
  var userChosenColour = event.target.id;

  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);

  playSound(userChosenColour);
  console.log(num);

  console.log(gamePattern.length);

  if(check(num)){
    if(num == gamePattern.length - 1){
      // console.log(1);
      num = -1;
      userClickedPattern = [];

      setTimeout(function() {
        nextSequence();
      }, 1200);

      }
  }

  else{

    $("body").addClass("game-over");
    $("h1").html("Game over ,Press any key to restart");
    // var temp2 = "sounds/" +  name + ".mp3";
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();

    setTimeout(function(){
      $("body").removeClass("game-over");
    } , 300);
    startOver();
  }
  num++;
});

$(document).on("keypress" , function(){

  if(first_time){

    first_time = false;

    start();
  }

  first_time = false;

});
