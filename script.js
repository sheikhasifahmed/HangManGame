const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const btnClose = document.querySelector(".modal-close");
const gameOver = document.getElementById("game-over");
const hiddenWord = document.getElementById("hidden-word");

const btnKey = document.querySelectorAll(".btn-key");
const info = document.getElementById("info");
const infoLife = document.getElementById("info-life");

const btnStart = document.getElementById("btn-start");

let life = 10;
let word;
let wordRef = "";
let hiddenStr;
let arrRef;

let words = [
  "committee",
  "library",
  "procecutor",
  "society",
  "spectacles",
  "armistice",
  "lieutenant",
  "padiatric",
  "pneumonia",
  "hospitality",
];

function choosingWord() {
  let index = Math.floor(Math.random() * 10);
  word = words[index].toUpperCase();
  console.log(word);
  hiddenStr = "".padStart(word.length * 2, "_ ");
  hiddenWord.innerText = hiddenStr;
  wordRef = "";
  for (let i = 0; i < word.length; i++) {
    wordRef += word[i] + " ";
  }
  arrRef = [...wordRef];

  btnStart.style.display = "none";
  hiddenWord.style.color = "cornsilk";
  life = 10;
  info.innerText = "Life Remaining:";
  infoLife.innerText = life;
}

btnStart.addEventListener("click", choosingWord);

let charFound = 0;
let isCharFound;

btnKey.forEach((key) =>
  key.addEventListener("click", function () {
    calculation(key);
  })
);

function calculation(key) {
  if (life > 0) {
    c = key.innerText.toUpperCase();
    charFound = 0;
    checkChar(c);
    while (isCharFound === true) checkChar(c);
    if (charFound == 0) {
      life--;
      infoLife.innerText = life;
    }

    if (!hiddenWord.innerText.includes("_")) {
      overlay.style.display = "block";
      modal.style.display = "block";
      gameOver.innerText = `Great!! You Won The Game !!
    Your Score: ${life}`;
      hiddenWord.innerText = wordRef;
      hiddenWord.style.color = "Green";
      info.innerText = `Your Score: `;

      btnStart.style.display = "block";
    }
    if (life == 0) {
      console.log("Game Over");
      overlay.style.display = "block";
      modal.style.display = "block";
      gameOver.innerText = `Ops! You Lose The Game !!`;
      hiddenWord.innerText = wordRef;
      hiddenWord.style.color = "red";
      info.innerText = "YOU LOSE !";
      infoLife.innerText = "";
      btnStart.style.display = "block";
    }
  }
}

btnClose.addEventListener("click", function () {
  overlay.style.display = "none";
  modal.style.display = "none";
});

function checkChar(char) {
  if (arrRef.includes(char)) {
    let index = arrRef.findIndex((c) => c == char);
    arrRef[index] = " ";

    hidArr = [...hiddenStr];
    hidArr[index] = char;
    hiddenStr = hidArr.join("");
    hiddenWord.innerText = hiddenStr;
    isCharFound = true;
    charFound++;
  } else {
    isCharFound = false;
  }
}