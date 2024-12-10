// const variables
const dice1Img = document.querySelector("#dice1");
const dice2Img = document.querySelector("#dice2");
const startBtn = document.querySelector(".start-btn");
const rollBtn = document.querySelector("#roll-btn");
const indBtn = document.querySelector("#ind-btn");
const sumBtn = document.querySelector("#sum-btn");
const endBtn = document.querySelector("#end-btn");
const p1NameInput = document.querySelector("#input1");
const p2NameInput = document.querySelector("#input2");
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const tBody = document.querySelector('tbody');
const playerOP = document.querySelector('#playerOP');
const p1Name = document.querySelector('#p1name');
const p2Name = document.querySelector('#p2name');
const paBtn = document.querySelector('.paBtn');
const winnerDiv = document.querySelector('.winner');

// let variables
let turn = 1;
let round = 1;
let die1 = 1;
let die2 = 1;
let player1Pts = 45;
let player2Pts = 45;
let player1TPts = 0;
let player2TPts = 0;
let player1Name = "";
let player2Name = "";


// start of click event for startBtn
startBtn.addEventListener('click', function(){
    // grabbing player names
    player1Name = p1NameInput.value.trim();
    player2Name = p2NameInput.value.trim();

    // conditional for the buttons
    if (player1Name && player2Name){
        document.querySelector(".game").style.display = "block";
        document.querySelector(".scorecard").style.display = "block";
        document.querySelector('.titles').style.display = 'block';
        document.querySelector(".players").style.display = "none";

        // p1NameInput.style.display = "none";
        // p2NameInput.style.display = "none";
        // startBtn.style.display = "none";

        // turn = player1Name;
        rollBtn.disabled = false;
    } else {
        alert("Please fill in a player's name.");
    }

    playerOP.textContent = `${player1Name}'s turn!`;
    p1Name.textContent = `${player1Name}`;
    p2Name.textContent = `${player2Name}`;
}); // end of click event for startBtn


// start of click event for rollBtn
rollBtn.addEventListener('click', function(){
    randNum();
    dice1Img.className = `bi bi-dice-${die1}`;
    dice2Img.className = `bi bi-dice-${die2}`;

    if (die1 === die2 || boxes[die1] === "X" || boxes[die2] === "X") {
        indBtn.disabled = true;
    } else {
        indBtn.disabled = false;
    }

    if (die1 + die2 > 9 || boxes[die1 + die2] === "X") {
        sumBtn.disabled = true;
    } else {
        sumBtn.disabled = false;
    }

    if (sumBtn.disabled === true && indBtn. disabled === true) {
        endBtn.disabled = false;
    }
    rollBtn.disabled = true;
}); // end of click event for rollBtn

// start of click event for indBtn
indBtn.addEventListener('click', function(){
    shut(die1);
    shut(die2);
    boxes[die1] = "X";
    boxes[die2] = "X";
    let sumOfDice = die1 + die2;
    boxes[0] = boxes[0] + sumOfDice;
    indBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
}); // end of click event for indBtn

// start of click event for sumBtn
sumBtn.addEventListener('click', function(){
    let sumOfDice = die1 + die2;
    shut(sumOfDice);
    boxes[sumOfDice] = "X";
    boxes[0] = boxes[0] + sumOfDice;
    indBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
}); // end of click event for sumBtn

// start of click event for endBtn
endBtn.addEventListener('click', function(){
    if (turn === 1){
        player1Pts = 45 - boxes[0];
        player1TPts = player1TPts + player1Pts;
        const tableTR = buildRow(round, player1Pts);
        tBody.insertAdjacentElement("beforeend", tableTR);
        turn = 2;
        playerOP.textContent = `${player2Name}'s turn!`;
        console.log('hello');
    } else if (turn === 2){
        player2Pts = 45 - boxes[0];
        player2TPts = player2TPts + player2Pts;
        document.querySelector(`#round${round} .p2Pts`).textContent = player2Pts;
        turn = 1;
        round++;
    }
    if (round === 6){
        endGame();
    }
    rollBtn.disabled = false;
    endBtn.disabled = true;
    resetBoard();
}); // end of click event for endBtn

// start of click event for paBtn
paBtn.addEventListener('click', function(){
    // document.querySelector('#input1').style.display = 'block';
    document.querySelector('.players').style.display = 'block';
    // document.querySelector('#input2').style.display = 'block';
    // document.querySelector('.start-btn').style.display = 'block';
    document.querySelector('.scorecard').style.display = 'none';
    document.querySelector('.winner').style.display = 'none';
    document.querySelector('tbody').innerHTML = '';

    boxes.fill(0);
    turn = 1;
    round = 1;
    player1TPts = 0;
    player2TPts = 0;
    player1Name = "";
    player2Name = "";
});

// function to generate random number
function randNum(){
    die1 = Math.floor(Math.random() * 6) + 1;
    die2 = Math.floor(Math.random() * 6) + 1;
} // end of randNum function

// fucntion to "shut" the box
function shut(boxNumber) {
    let box = document.querySelector(`#box${boxNumber}`);
    box.classList.add('shut');
    box.textContent = "X";
} // end of shut function

// function to add to the scorecard
function buildRow(round, pts){
    let tableTR= document.createElement('tr');
    tableTR.id = `round${round}`;
    let tableTH = document.createElement('th');
    tableTH.textContent = `Round ${round}`;
    let tableTD1 = document.createElement('td');
    tableTD1.className = "p1Pts"
    tableTD1.textContent = player1Pts;
    let tableTD2 = document.createElement('td');
    tableTD2.className = "p2Pts";
    tableTR.insertAdjacentElement("afterbegin", tableTH);
    tableTR.insertAdjacentElement("beforeend", tableTD1);
    tableTR.insertAdjacentElement("beforeend", tableTD2);
    return tableTR;
} // end of buildRow function

// function to reset the cards
function resetBoard() {
    boxes.fill(0);
    let boxs = document.querySelectorAll('.gi');
    // console.log(boxs);
    boxs.forEach((box, ind) => {
        box.classList.remove('shut');
        box.textContent = ind + 1;
    });
}

function endGame(){
    document.querySelector(".titles").style.display = 'none';
    document.querySelector('.winner').style.display = 'block';
    document.querySelector('.game').style.display = 'none';

    let winner = "";
    if (player1TPts < player2TPts){
        winner = player1Name;
        document.querySelector("#winnerOP").textContent = `${winner} is the winner of the game!`;
    } else if (player1TPts > player2TPts){
        winner = player2Name;
        document.querySelector("#winnerOP").textContent = `${winner} is the winner of the game!`;
    } else if (player1TPts === player2TPts) {
        document.querySelector("#winnerOP").textContent = `It's a tie!`;
    }
}
