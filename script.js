
const wordDisplay = document.querySelector(".word-display");
const hintText = document.querySelector(".hint-text b");
const guessesText = document.querySelector(".guesses-text b");
const keyboard = document.querySelector(".keyboard");
const playAgainButton = document.querySelector(".play-again");
const gameModal = document.querySelector(".game-modal");
const modalContent = gameModal.querySelector(".content");
const hangmanImage = document.querySelector(".hangman-box img");
const modalGif = modalContent.querySelector("img");
const words = [
    { word: "mercury", hint: "The closest planet to the Sun." },
    { word: "venus", hint: "The hottest planet in the solar system." },
    { word: "earth", hint: "Our home planet." },
    { word: "mars", hint: "Known as the Red Planet." },
    { word: "jupiter", hint: "The largest planet in the solar system." },
    { word: "saturn", hint: "This planet has the most beautiful rings." },
    { word: "uranus", hint: "The planet that rotates on its side." },
    { word: "neptune", hint: "The farthest planet from the Sun in our solar system." },
    { word: "pluto", hint: "Formerly the ninth planet, now considered a dwarf planet." }
];

let selectedWord = "";
let guessedLetters = [];
let incorrectGuesses = 0;
const maxGuesses = 5;

function initGame() {
    const randomWordObj = words[Math.floor(Math.random() * words.length)];
    selectedWord = randomWordObj.word;
    guessedLetters = [];
    incorrectGuesses = 0;

    wordDisplay.innerHTML = selectedWord
        .split("")
        .map(() => `<li class="letter">_</li>`)
        .join("");
    hintText.textContent = randomWordObj.hint;
    guessesText.textContent = `0/${maxGuesses}`;
    hangmanImage.src = "./hangman-1.svg";

    Array.from(keyboard.children).forEach(button => {
        button.disabled = false;
        button.classList.remove("correct", "incorrect");
    });

    gameModal.style.display = "none";
}

function handleLetterClick(event) {
    const button = event.target;
    const letter = button.textContent.toLowerCase();
    button.disabled = true;

    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        selectedWord.split("").forEach((char, index) => {
            if (char === letter) {
                wordDisplay.children[index].textContent = letter;
            }
        });
        button.classList.add("correct");

        const guessedWord = Array.from(wordDisplay.children)
            .map(li => li.textContent)
            .join("");
        if (guessedWord === selectedWord) {
            endGame(true);
        }
    } else {
        incorrectGuesses++;
        guessesText.textContent = `${incorrectGuesses}/${maxGuesses}`;
        hangmanImage.src = `./hangman-${incorrectGuesses + 1}.svg`;
        button.classList.add("incorrect");

        if (incorrectGuesses === maxGuesses) {
            endGame(false);
        }
    }
}

function endGame(isWin) {
    gameModal.style.display = "flex";
    const modalMessage = isWin
        ? "Congratulations! You guessed the word!"
        : "Game Over! Better luck next time!";
    modalContent.querySelector("h4").textContent = modalMessage;
    modalContent.querySelector("b").textContent = selectedWord;

    modalGif.src = isWin ? "./victory.gif" : "./lost.gif";
}

playAgainButton.addEventListener("click", initGame);

keyboard.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        handleLetterClick(event);
    }
});

initGame();
