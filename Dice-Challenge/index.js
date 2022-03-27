

var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var src1 = `./images/dice${randomNumber1}.png`;
var src2 = `./images/dice${randomNumber2}.png`;

var dice1 = document.querySelector(".img1");
var dice2 = document.querySelector(".img2");

dice1.setAttribute("src", src1);
dice2.setAttribute("src", src2);

if(randomNumber1 === randomNumber2){
    document.querySelector("h1").innerHTML = "Draw !";
}
else if(randomNumber1 > randomNumber2){
    document.querySelector("h1").innerHTML = "&#128681 Player 1 Wins !";
}
else{
    document.querySelector("h1").innerHTML = "Player 2 Wins ! &#128681";  
}