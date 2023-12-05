document.addEventListener("DOMContentLoaded", async function () {

    // Inicializar variables
    let guessedLetters = [];
    let hangmanImage = 0;
    const wordDisplay = document.getElementById("word-display");
    const lettersContainer = document.getElementById("letters-container");
    const hangmanImageElement = document.getElementById("hangman-image");
    const dynamicTitle = document.getElementById("dynamic-title");

    // Traer la palabra del día
    async function getHangmanWord() {
        try {
            const response = await fetch('static/jsons/words_hangman.json');
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
    
            const data = await response.json();
            var date = new Date();
            var month = date.toLocaleString('default', { month: 'long' });
            var day = date.getDate().toString();
    
            return data[month.toLowerCase()][day];

        } catch (error) {
            console.error(error);
        }
    }
    let wordObj = await getHangmanWord();
    let selectedWord = wordObj.word;
    let selectedWordDefinition = wordObj.definition;


    // LocalStorage: comprobo si el usuario ya jugó hoy
    var lsHangman = JSON.parse(localStorage.getItem("hangman"));
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var dateForSave = `${d}/${m}/${y}`

    if(lsHangman && lsHangman.date === dateForSave){
        if(lsHangman.succeeded === true){
            dynamicTitle.innerHTML = "¡Correcto! &#127894;"
            lettersContainer.innerHTML = selectedWordDefinition;
            wordDisplay.textContent = selectedWord;
            return;
        }else{
            dynamicTitle.innerHTML = "Fallaste &#128128;"
            lettersContainer.innerHTML = selectedWordDefinition;
            wordDisplay.textContent = selectedWord;
            return;
        }
    }

    // Funciones del juego
    function displayWord() {
        let displayText = "";
        for (let letter of selectedWord) {
            letter = letter.toUpperCase();
            if (guessedLetters.includes(letter)) {
                displayText += letter + " ";
            } else {
                displayText += "_ ";
            }
        }
        wordDisplay.textContent = displayText;
    }

    function updateHangmanImage() {
        let imageUrl = "/static/images/hangman/" + hangmanImage + ".png";
        hangmanImageElement.src = imageUrl;
    }

    function checkWin() {
        if (!wordDisplay.textContent.includes("_")) {
            dynamicTitle.innerHTML = "¡Correcto! &#127894;"
            lettersContainer.innerHTML = selectedWordDefinition;

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var dateForSave = `${d}/${m}/${y}`
            let lsHangman = {
                "date": dateForSave,
                "succeeded": true
            };
            localStorage.setItem("hangman", JSON.stringify(lsHangman));
        }
    }

    function checkLose() {
        if (hangmanImage === 6) {
            dynamicTitle.innerHTML = "Fallaste &#128128;"
            lettersContainer.innerHTML = selectedWordDefinition;
            wordDisplay.textContent = selectedWord;

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var dateForSave = `${d}/${m}/${y}`
            let lsHangman = {
                "date": dateForSave,
                "succeeded": false
            };
            localStorage.setItem("hangman", JSON.stringify(lsHangman));
        }
    }

    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.textContent = letter;
        button.classList.add("letter-button");
        lettersContainer.appendChild(button);
    }

    lettersContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("letter-button")) {
            let letter = event.target.textContent;
            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter);
                event.target.disabled = true;
                displayWord();

                letter = letter.toUpperCase();
                selectedWord = selectedWord.toUpperCase();

                if (!selectedWord.includes(letter)) {
                    hangmanImage++;
                    updateHangmanImage();
                    checkLose();
                } else {
                    checkWin();
                }
            }
        }
    });

    displayWord();
});