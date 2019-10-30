/*
    Pig Game
    Rules:
    - 2 players take turns playing in rounds
    - Each turn the player rolls a dice, and can keep rolling or hold. 
    - If a player rolls a 1, then his turn is over and he does not gain any points
    - If a player holds, they keep the accumulated points from rolling
    - The first player to reach 100 or more collected points wins
*/

var scores, roundScore, activePlayer;
var diceImage = document.getElementById('dice-image');
var p1Score = document.getElementById('player1-score');
var p2Score = document.getElementById('player2-score');
var p1RoundScore = document.getElementById('player1-round-score');
var p2RoundScore = document.getElementById('player2-round-score');
var p1Turn = document.getElementById('player1-turn');
var p2Turn = document.getElementById('player2-turn');
var btnRoll = document.getElementById('btn-roll');
var btnHold = document.getElementById('btn-hold');
var btnRestart = document.getElementById('btn-restart');

Reset();

/* Events */

btnRoll.addEventListener('click', Roll);
btnHold.addEventListener('click', Hold);
btnRestart.addEventListener('click', Reset);

/* Functions */

function Roll()
{
    var rollValue = Math.floor(Math.random() * 6) + 1;
    UpdateDice(rollValue);
    if(rollValue == 1){
        RoundOver();
    } else{
        roundScore += rollValue;
        document.querySelector('#player' + (activePlayer + 1) + '-round-score').innerHTML = '<em>' + roundScore + '</em>';
    }
}

function UpdateDice(value)
{
    if (value == 0){
        diceImage.src = "";
    } else {
        diceImage.src = "/images/" + value + ".png";
    }
}

function Hold()
{
    scores[activePlayer] = scores[activePlayer] + roundScore;
    document.querySelector('#player' + (activePlayer + 1) + '-score').textContent = scores[activePlayer];
    if(scores[activePlayer] >= 100){
        GameOver();
    } else{
        RoundOver();
    }
}

function RoundOver()
{
    roundScore = 0;
    document.querySelector('#player' + (activePlayer + 1) + '-round-score').textContent = "";
    document.querySelector('#player' + (activePlayer + 1)).style.background = 'var(--primary-color)';
    if(activePlayer == 0){
        activePlayer = 1;
    } else{
        activePlayer = 0;
    }
    document.querySelector('#player' + (activePlayer + 1)).style.background = 'var(--selection-color)';
    document.querySelector('#player' + (activePlayer + 1) + '-round-score').textContent = 0;
    UpdateDice(0);
}

function GameOver()
{
    if(activePlayer == 0){
        p1Turn.textContent = "WINNER!";
    } else {
        p2Turn.textContent = "WINNER!";
    }
    btnHold.style.display = 'none';
    btnRoll.style.display = 'none';
    btnRestart.style.display = 'block';
}

function Reset()
{
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    p1Score.textContent = 0;
    p2Score.textContent = 0;
    p1RoundScore.textContent = 0;
    p2RoundScore.textContent = "";
    p1Turn.textContent = "";
    p2Turn.textContent = "";
    UpdateDice(0);
    btnRoll.style.display = 'block';
    btnHold.style.display = 'block';
    btnRestart.style.display = 'none';
}