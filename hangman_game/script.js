const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

let words = [];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

let selectedWord = '';

fetchRandomWords();

async function fetchRandomWords () {

    const res = await fetch('https://random-word-api.herokuapp.com/word?number=10');

    words = await res.json();

    randomWord();

    displayWord();


}

function randomWord() {

    selectedWord = words[Math.floor(Math.random() * words.length)];


}

function displayWord() {

    wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>`
			)
			.join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if(innerWord === selectedWord) {

    finalMessage.innerText = 'Congratulations! You won! 😃';
    finalMessageRevealWord.innerText = `${selectedWord} is correct`;
    popup.style.display = 'flex';

    playable = false;
  }
}

function updateWrongLettersEl() {

    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((parts, index) => {

        const errors = wrongLetters.length;

        if(index < errors) {

            parts.style.display = 'block';
        }

        else {

            parts.style.display = 'none';
        }
    });

    //check if lost

    if(wrongLetters.length === figureParts.length) {

        finalMessage.innerText = 'Unfortunately you lost. 😕';
        finalMessageRevealWord.innerText = `The word was: ${selectedWord}`;
        popup.style.display = 'flex';

        playable = false;
    }
}

function showNotification() {

    notification.classList.add('show');

    setTimeout(() => {

        notification.classList.remove('show');
    }, 2000);
}

window.addEventListener('keydown', e => {

    if(playable) {

        if(e.keyCode >= 65 && e.keyCode <= 90) {

            const letter = e.key;
            
            if(selectedWord.includes(letter)) {

                if(!correctLetters.includes(letter)) {

                    correctLetters.push(letter);

                    displayWord();
                }
                else {

                    showNotification();
                }
            }

            else {
                
                if(!wrongLetters.includes(letter)) {

                    wrongLetters.push(letter);

                    updateWrongLettersEl();
                }

                else {

                    showNotification();
                }
                
            }
            
        }
    }
});

playAgainBtn.addEventListener('click', () => {

    playable = true;

    correctLetters.splice(0);
    wrongLetters.splice(0);

    fetchRandomWords();

    updateWrongLettersEl();

    popup.style.display = 'none';
})





