document.addEventListener("DOMContentLoaded", async function () {

    alert("Entra a js");

    // Inicializar variables
    let guessedLetters = [];
    let hangmanImage = 0;
    const wordDisplay = document.getElementById("word-display");
    const lettersContainer = document.getElementById("letters-container");
    const hangmanImageElement = document.getElementById("hangman-image");
    const dynamicTitle = document.getElementById("dynamic-title");

    alert("despues de inicializar variables");

    // Traer la palabra del día
    async function getHangmanWord() {
        try {
            alert("Entra al try de getHangmanWord()");
            const response = await fetch('static/jsons/words_hangman.json');
            if (!response.ok) {
                alert("Error response.ok");
                throw new Error('Error al cargar el archivo JSON');
            }

            alert("Antes de await response.json()");
            const data = await response.json();
            alert("Despues de await response.json()");
            alert(data);
            let date = new Date();
            let month = date.toLocaleString('en-US', { month: 'long' });
            let day = date.getDate().toString();

            alert(date);
            alert("Mes: " + month);
            alert("Dia: " + day);
            alert("antes del return");

            return data[month.toLowerCase()][day];

        } catch (error) {
            alert("entra al catch");
            alert(error);
            console.error(error);
        }
    }
    alert("antes de llamar a getHangmanWord()");
    let wordObj = await getHangmanWord();
    alert("despues de letword");
    let selectedWord = wordObj.word.toUpperCase();
    let selectedWordDefinition = wordObj.definition;

    alert("SelectedWord: " + selectedWord);
    alert("SelectedWordDefinition: " + selectedWordDefinition);

    alert("antes de localstorage");

    // LocalStorage: compruebo si el usuario ya jugó hoy
    try {
        let lsHangman = localStorage.getItem("hangman");
        if (lsHangman) {
            alert("Dentro del if de lsHangman");
            let lsHangmanObj = JSON.parse(lsHangman);
            const date = new Date();
            let d = date.getDate();
            let m = date.getMonth();
            let y = date.getFullYear();
            let dateForSave = `${d}/${m}/${y}`

            alert("antes de condicional de fecha");

            if (lsHangmanObj && lsHangmanObj.date === dateForSave) {
                if (lsHangmanObj.succeeded === true) {
                    dynamicTitle.innerHTML = "¡Muy bien! &#127894;";
                    lettersContainer.innerHTML = selectedWordDefinition;
                    wordDisplay.textContent = selectedWord;
                    hangmanImage = 7;
                    updateHangmanImage();
                    return;
                } else {
                    dynamicTitle.innerHTML = "Fallaste &#128128; ¡Prueba mañana!";
                    lettersContainer.innerHTML = selectedWordDefinition;
                    wordDisplay.textContent = selectedWord;
                    hangmanImage = 6;
                    updateHangmanImage();
                    return;
                }
            }
        }
    } catch (error) {
        alert("Error en el localstorage");
        alert(error);
        console.log("Error con localstorage");
        console.log(error);
    }

    alert("antes de funciones del juego");

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
        const currentScheme = window.location.protocol;
        const imagePath = "static/images/hangman/" + hangmanImage + ".png";
        const imageUrl = currentScheme + "//" + window.location.host + "/" + imagePath;
        hangmanImageElement.src = imageUrl;
    }

    function checkWin() {
        if (!wordDisplay.textContent.includes("_")) {
            dynamicTitle.innerHTML = "¡Muy bien! &#127894;";
            lettersContainer.innerHTML = selectedWordDefinition;
            hangmanImage = 7;
            updateHangmanImage();

            // Guardar en localStorage que ha ganado
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

            // Guardar en localStorage que ha perdido
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