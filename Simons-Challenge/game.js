const colors = ["red", "blue", "green", "yellow"];
var game = [];
var userChoice = [];
var level = 0;
var sequencePlaying = false;
var isGameOver = false;

$(document).on('keypress', () => {
    if (level == 0) {
        isGameOver = false;
        level++;
        $("#level-title").text(`Level ${level}`);
        nextSequence();
    }
});

function nextSequence(){
    sequencePlaying = true;
    game.push(colors[Math.floor(Math.random() * 4)]);
    showSequence();
}

async function showSequence() {
    for (let i = 0; i < game.length; i++) {
        playSound(game[i]);
        await animateButton(game[i]);
    }
    sequencePlaying = false;
}

$(".btn").on('click', async (event) => {
    if (sequencePlaying || isGameOver || level == 0)
        return;

    var id = event.target.id
    
    playSound(id);
    await animateButton(id);
    userChoice.push(id)

    for (var i = 0; i < userChoice.length; i++) {
        if (userChoice[i] != game[i]) {
            return gameOver();
        }
    }

    if (userChoice.length == game.length) {
        userChoice = [];
        level++;
        $("#level-title").text(`Level ${level}`);
        await sleep(500);
        nextSequence();
    }
});

async function gameOver() {
    isGameOver = true;
    game = [];
    userChoice = [];
    level = 0;
    $("#level-title").text("Game over... Press any key to play again");
    $("body").css("background-color","red");
    await sleep(200);
    $("body").css("background-color","#011F3F");
}

function playSound(id){
    var audio = new Audio(`sounds/${id}.mp3`);
    audio.play();
}

async function animateButton(id){
    $("#" + id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    await sleep(400);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


