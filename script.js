let target;
function mousedown(event) {
    target = event.target;
    target.style.boxShadow = "none";
}
function mouseup() {
    target.style.boxShadow = "1px 1px 1px";
}
window.onload = function () {
    let buttons = document.querySelectorAll(".button");
    buttons.forEach(button => button.addEventListener("mousedown", mousedown));
    document.documentElement.addEventListener("mouseup", mouseup);
};

function createGame(){
    function generateRandomNumber() {
        let number = Math.floor(Math.random() * 100) + 1;
        return () => number;  // Closure: Only a function can access this value
    }
    
    let getRandomNumber = generateRandomNumber(); // Store the function to access the number

    const guesses = document.querySelector(".guesses");
    const lastResult = document.querySelector(".lastResult");
    const lowOrHi = document.querySelector(".lowOrHi");
    const guessSubmit = document.querySelector("#guessSubmit");
    const guessField = document.querySelector(".guessField");
    let guessCount = 1;
    let resetButton;

    function checkGuess() {
        const userGuess = Number(guessField.value);
        const randomNumber = getRandomNumber(); // Access the stored random number safely

        if (guessCount === 1) {
            guesses.textContent = "Previous guesses:";
        }
        guesses.textContent = `${guesses.textContent} ${userGuess}`;
    
        if (userGuess === randomNumber) {
            lastResult.textContent = `Congratulations! You got it right in ${guessCount} attempts!`;
            lastResult.style.backgroundColor = "green";
            lowOrHi.textContent = "";
            setGameOver();
        }
        else if (guessCount === 10) {
            lastResult.textContent = "!!!GAME OVER!!!";
            lowOrHi.textContent = "";
            setGameOver();
        }
        else {
            lastResult.textContent = "Wrong!";
            lastResult.style.backgroundColor = "red";
            if (userGuess < randomNumber) {
                lowOrHi.textContent = "Last guess was too low!";
            } else if (userGuess > randomNumber) {
                lowOrHi.textContent = "Last guess was too high!";
            }
        }
    
        guessCount++;
        guessField.value = "";
        guessField.focus();
    }
    
    guessSubmit.addEventListener("click", checkGuess);
    
    function setGameOver() {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        resetButton = document.createElement("button");
        resetButton.textContent = "Start new game";
        resetButton.classList.add("button");
        resetButton.classList.add("new");
        lowOrHi.append(resetButton);
    
        // Add event listeners for mousedown & mouseup on the new button
        resetButton.addEventListener("click", resetGame);
        resetButton.addEventListener("mousedown", mousedown);
        resetButton.addEventListener("mouseup", mouseup);
    }
    
    function resetGame() {
        guessCount = 1;
    
        const resetParas = document.querySelectorAll(".resultParas p");
        for (const resetPara of resetParas) {
            resetPara.textContent = "";
        }
    
        resetButton.remove();
    
        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = "";
    
        lastResult.style.removeProperty('background-color');
    
        getRandomNumber = generateRandomNumber(); // Generate a new random number safely
    }
}

createGame();

const movingBarDiv = document.querySelector('.moving-bar > div');
const movingBarP = document.querySelector('.moving-bar > div > p');
const movingBar = document.querySelector('.moving-bar');

function animateText() {
    const textWidth = movingBarP.clientWidth;
    const divWidth = movingBarDiv.clientWidth;
    const barWidth = movingBar.clientWidth;
    console.log(textWidth);
    console.log(divWidth);

    movingBarP.style.animationName = `sliding-animation`;
    movingBarP.style.animationTimingFunction = 'linear';
    movingBarP.style.animationIterationCount = 'infinite';

    const style = document.createElement('style');
    style.textContent = `@keyframes sliding-animation { from { transform: translateX(${divWidth}px); } to { transform: translateX(${-textWidth}px); } }`;
    document.head.appendChild(style);
}

// Call the function to start the animation
animateText();

// this is added when use resize window, animation follows it
window.onresize = animateText;