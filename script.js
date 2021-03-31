/*Speech Recognition */

btnEnregistrer = document.getElementById("enregistrer");
let btnStop = document.getElementById("stop");

let inputTexte = document.getElementById("text-speechrecognition");

let reconnaissance = new window.webkitSpeechRecognition();
reconnaissance.lang = "fr-FR"; /*Choix de la langue*/
reconnaissance.continuous = true;

reconnaissance.onresult = function (event) {
  inputTexte.value = event.results[0][0].transcript;
};

btnEnregistrer.onclick = function () {
  reconnaissance.start();
};

btnStop.onclick = function () {
  reconnaissance.stop();
};

/* Speech Synthesis*/

const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const textInput = document.getElementById("text-speechsynthesis");
const speedInput = document.getElementById("speed");
let currentCharacter;

playButton.addEventListener("click", () => {
  playText(textInput.value);
});
pauseButton.addEventListener("click", pauseText);
stopButton.addEventListener("click", stopText);
speedInput.addEventListener("input", () => {
  stopText();
  playText(utterance.text.substring(currentCharacter));
});

const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener("end", () => {
  textInput.disabled = false;
});
utterance.addEventListener("boundary", (e) => {
  currentCharacter = e.charIndex;
});
utterance.lang = "fr-FR"; /*Choix de la langue*/

function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }
  if (speechSynthesis.speaking) return;
  utterance.text = text;
  utterance.rate = speedInput.value || 1;
  textInput.disabled = true;
  speechSynthesis.speak(utterance);
}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
