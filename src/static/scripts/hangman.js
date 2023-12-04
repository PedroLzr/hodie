document.addEventListener("DOMContentLoaded", function () {

    // Lista de palabras para el juego
    const words = ["serendipia", "continuado", "nascisista", "colombia", "libreta", "pajarita", "serpiente", "cosmos", "diurno", "arriba"];

    // Escoge una palabra al azar de la lista
    let selectedWord = words[Math.floor(Math.random() * words.length)];

    // Inicialización de variables
    let guessedLetters = [];
    let hangmanImage = 0;
    const wordDisplay = document.getElementById("word-display");
    const lettersContainer = document.getElementById("letters-container");
    const hangmanImageElement = document.getElementById("hangman-image");

    // Función para mostrar la palabra oculta con guiones bajos y letras adivinadas
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

    // Función para actualizar la imagen del ahorcado
    function updateHangmanImage() {
        let imageUrl = "/static/images/hangman/" + hangmanImage + ".png";
        hangmanImageElement.src = imageUrl;
    }

    // Función para verificar si el jugador ha ganado
    function checkWin() {
        if (!wordDisplay.textContent.includes("_")) {
            alert("¡Has ganado!");
            resetGame();
        }
    }

    // Función para verificar si el jugador ha perdido
    function checkLose() {
        if (hangmanImage === 6) {
            alert("¡Has perdido! La palabra era: " + selectedWord);
            resetGame();
        }
    }

    // Función para reiniciar el juego
    function resetGame() {
        guessedLetters = [];
        hangmanImage = 0;
        selectedWord = words[Math.floor(Math.random() * words.length)];
        displayWord();
        updateHangmanImage();
    }

    // Event listener para manejar los clics en las letras
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

    // Inicialización del juego
    displayWord();

    // Creación de botones de letras
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.textContent = letter;
        button.classList.add("letter-button");
        lettersContainer.appendChild(button);
    }

});