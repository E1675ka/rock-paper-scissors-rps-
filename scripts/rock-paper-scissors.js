let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};
/* 
    if (!score) {
      score = {
        wins: 0,
        loses: 0,
        ties: 0,
      };
    } */
function reset() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}
updateScoreElement();
let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pikComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
  const play = document.querySelector(".js-autoPlay");

  if (isAutoPlaying === true) {
    setTimeout(() => {
      play.innerHTML = "Stop Playing";
    }, 1000);
  } else {
    play.innerHTML = "Auto Play";
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});
document.querySelector(".js-autoPlay").addEventListener("click", () => {
  autoPlay();
});
document.querySelector(".js-rest-button").addEventListener("click", () => {
  const message = document.querySelector(".js-confirm-message");
  message.innerHTML = `
    <p>Are you sure you want to reset the score?</P> 
    <button class="reset js-yes" onclick="">Yes</button>
    <button class="reset js-no" onclick="">No</button>
   
`;
  document.querySelector(".js-yes").addEventListener("click", () => {
    reset();
    message.innerHTML = "";
  });
  document.querySelector(".js-no").addEventListener("click", () => {
    setTimeout(() => {
      message.innerHTML = "";
    }, 1000);
  });
});

const alert = document.querySelector(".js-demo");
setTimeout(() => {
  if (alert.classList.contains("demo")) {
    alert.classList.remove("demo");
    alert.classList.add("demo2");
  }
}, 4000);

console.log(alert);
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    reset();
    localStorage.removeItem("score");
    updateScoreElement();
    autoPlay();
    /*  document.querySelector(".js-confirm-message").innerHTML = `
    <p>Are you sure you want to reset the score?</P>
    <button onclick="${reset()}">Yes</button>
    <button onclick="">No</button>
`; */
  }
});
function pikComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pikComputerMove();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose!";
    } else if (computerMove === "paper") {
      result = "You win!";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win!";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You lose!";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You lose!";
    } else if (computerMove === "scissors") {
      result = "You win!";
    }
  }

  if (result === "You win!") {
    score.wins += 1;
  } else if (result === "You lose!") {
    score.loses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = `  ${result}`;
  document.querySelector(".js-moves").innerHTML = ` You
  <img src="/images/${playerMove}-emoji.png" class="moves-icon" />
  <img src="/images/${computerMove}-emoji.png" class="moves-icon" /> Computer`;
}
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins : ${score.wins}  Loses : ${score.loses}  Ties: ${score.ties}`;
}
