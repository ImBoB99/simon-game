var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


$(document).keypress(function(){
    if (started === false) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);

}

$(".btn").click(function (event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    switch (name) {
        case "blue":
            var blue = new Audio('sounds/blue.mp3');
            blue.play();
            break;
        case "green":
            var green = new Audio('sounds/green.mp3');
            green.play();
            break;
        case "red":
            var red = new Audio('sounds/red.mp3');
            red.play();
            break;
        case "yellow":
            var yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
            break;
        case "wrong":
            var wrong = new Audio('sounds/wrong.mp3');
            wrong.play();
            break;
        default:
            break;
    }
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000)
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}