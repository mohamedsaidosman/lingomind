import animals from "./animals.js";
import fruits from "./fruits.js";
import colors from "./colors.js";
import countries from "./countries.js";
import sports from "./sports.js";
import movies from "./movies.js";
import music from "./music.js";
import food from "./food.js";
import nature from "./nature.js";
import technology from "./technology.js";

const wordLists = {
  animals,
  fruits,
  colors,
  countries,
  sports,
  movies,
  music,
  food,
  nature,
  technology
};

const difficultyLevels = {
  easy: { attempts: 8, timePerQuestion: 30 },
  medium: { attempts: 6, timePerQuestion: 20 },
  hard: { attempts: 4, timePerQuestion: 15 }
};

let attempts = 5;
let currentWord = "";
let timerInterval;
let remainingTime = 0;
let wordLength = 5;
let currentWordList;

function getRandomWord() {
  const selectedSubject = document.getElementById("subject").value;
  const wordList = wordLists[selectedSubject];
  const validWords = wordList.filter(
    (word) => word.length >= 4 && word.length <= 7
  );
  const randomIndex = Math.floor(Math.random() * validWords.length);
  currentWord = validWords[randomIndex];
  wordLength = currentWord.length;
  return currentWord;
}

function startTimer() {
  timerInterval = setInterval(() => {
    document.getElementById(
      "timer"
    ).textContent = `Time left: ${remainingTime} seconds`;
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").textContent = "Time's up!";
      document.getElementById("guess").setAttribute("disabled", "true");
      document.getElementById("checkGuess").setAttribute("disabled", "true");
      showAnswer();
    }
    remainingTime--;
  }, 1000);
}

function checkGuess() {
  const guess = document.getElementById("guess").value.toLowerCase();
  const selectedDifficulty = document.getElementById("difficulty").value;

  if (guess.length !== wordLength) {
    alert(`Please enter a ${wordLength}-letter word.`);
    return;
  }

  if (guess === currentWord) {
    document.getElementById("result").textContent =
      "Congratulations! You guessed the word!";
    document.getElementById("result").style.color = "green";
    clearInterval(timerInterval);
    document.getElementById("guess").setAttribute("disabled", "true");
    document.getElementById("checkGuess").setAttribute("disabled", "true");
    showAnswer();
  } else {
    attempts--;
    document.getElementById(
      "attempts"
    ).textContent = `Attempts left: ${attempts}`;
    document.getElementById("result").textContent =
      "Incorrect guess. Try again.";
    document.getElementById("result").style.color = "red";

    if (attempts === 0) {
      document.getElementById(
        "result"
      ).textContent = `Out of attempts. The word was "${currentWord}".`;
      clearInterval(timerInterval);
      document.getElementById("guess").setAttribute("disabled", "true");
      document.getElementById("checkGuess").setAttribute("disabled", "true");
      showAnswer();
    }
  }

  document.getElementById("timer").textContent = "Time left: 0 seconds";
  document.getElementById("guess").value = "";
}

function showAnswer() {
  document.getElementById("answerSection").style.display = "block";
  document.getElementById("answer").textContent = currentWord;

  document.getElementById("tryAgainButton").addEventListener("click", () => {
    resetGame();
  });
}

function resetGame() {
  attempts = 5;
  document.getElementById(
    "attempts"
  ).textContent = `Attempts left: ${attempts}`;
  document.getElementById("result").textContent = "";
  document.getElementById("answerSection").style.display = "none";
  document.getElementById("startButton").removeAttribute("disabled");
  document.getElementById("guess").setAttribute("disabled", "true");
  document.getElementById("checkGuess").setAttribute("disabled", "true");
  document.getElementById("startButton").textContent = "Start";
  clearInterval(timerInterval);
  document.getElementById("timer").textContent = "Time left: 0 seconds";
  document.getElementById("guess").value = "";
  document.getElementById("wordLengthSpan").textContent = "__";
}

document.getElementById("subject").addEventListener("change", () => {
  const selectedSubject = document.getElementById("subject").value;
  currentWordList = wordLists[selectedSubject];
  if (
    !currentWordList.includes(currentWord) ||
    currentWord.length !== wordLength
  ) {
    getRandomWord();
  }
});

document.getElementById("difficulty").addEventListener("change", () => {
  const selectedDifficulty = document.getElementById("difficulty").value;
  const timePerQuestion = difficultyLevels[selectedDifficulty].timePerQuestion;
  document.getElementById(
    "timePerQuestionDisplay"
  ).textContent = `Time per question: ${timePerQuestion} seconds`;
});

document.getElementById("startButton").addEventListener("click", () => {
  const selectedDifficulty = document.getElementById("difficulty").value;
  remainingTime = difficultyLevels[selectedDifficulty].timePerQuestion;
  currentWord = getRandomWord();
  document.getElementById("startButton").setAttribute("disabled", "true");
  document.getElementById("guess").removeAttribute("disabled");
  document.getElementById("checkGuess").removeAttribute("disabled");
  document.getElementById("startButton").textContent = "Started";
  document.getElementById("wordLengthSpan").textContent = wordLength;
  startTimer();
});

document.getElementById("checkGuess").addEventListener("click", () => {
  checkGuess();
});
