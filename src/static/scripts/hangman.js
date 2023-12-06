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
            let date = new Date();
            let month = date.toLocaleString('default', { month: 'long' });
            let day = date.getDate().toString();

            return data[month.toLowerCase()][day];

        } catch (error) {
            console.error(error);
        }
    }
    let wordObj = await getHangmanWord();
    let selectedWord = wordObj.word.toUpperCase();
    let selectedWordDefinition = wordObj.definition;


    // LocalStorage: compruebo si el usuario ya jugó hoy
    // try {
    //     let lsHangman = localStorage.getItem("hangman");
    //     if (lsHangman) {
    //         let lsHangmanObj = JSON.parse(lsHangman);
    //         const date = new Date();
    //         let d = date.getDate();
    //         let m = date.getMonth();
    //         let y = date.getFullYear();
    //         let dateForSave = `${d}/${m}/${y}`

    //         if (lsHangmanObj && lsHangmanObj.date === dateForSave) {
    //             if (lsHangmanObj.succeeded === true) {
    //                 dynamicTitle.innerHTML = "¡Muy bien! &#127894;";
    //                 lettersContainer.innerHTML = selectedWordDefinition;
    //                 wordDisplay.textContent = selectedWord;
    //                 hangmanImage = 7;
    //                 updateHangmanImage();
    //                 return;
    //             } else {
    //                 dynamicTitle.innerHTML = "Fallaste &#128128; ¡Prueba mañana!";
    //                 lettersContainer.innerHTML = selectedWordDefinition;
    //                 wordDisplay.textContent = selectedWord;
    //                 hangmanImage = 6;
    //                 updateHangmanImage();
    //                 return;
    //             }
    //         }
    //     }
    // } catch (error) {
    //     console.log("Error con localstorage");
    //     console.log(error);
    // }

    // Funciones del juego
    function displayWord() {
        let displayText = "";
        for (let letter of selectedWord) {
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
            dynamicTitle.innerHTML = "¡Muy bien! &#127894;";
            lettersContainer.innerHTML = selectedWordDefinition;
            hangmanImage = 7;
            updateHangmanImage();

            const date = new Date();
            let d = date.getDate();
            let m = date.getMonth();
            let y = date.getFullYear();
            let dateForSave = `${d}/${m}/${y}`
            let lsHangman = {
                "date": dateForSave,
                "succeeded": true
            };
            localStorage.setItem("hangman", JSON.stringify(lsHangman));
        }
    }

    function checkLose() {
        if (hangmanImage === 6) {
            dynamicTitle.innerHTML = "Fallaste &#128128; ¡Prueba mañana!";
            lettersContainer.innerHTML = selectedWordDefinition;
            wordDisplay.textContent = selectedWord;

            const date = new Date();
            let d = date.getDate();
            let m = date.getMonth();
            let y = date.getFullYear();
            let dateForSave = `${d}/${m}/${y}`
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
            let letter = event.target.textContent.toUpperCase();

            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter);
                event.target.disabled = true;
                displayWord();

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