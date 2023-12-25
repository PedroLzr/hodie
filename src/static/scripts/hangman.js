document.addEventListener("DOMContentLoaded", async function () {

    // Inicializar variables
    const WORD_DISPLAY = document.getElementById("word-display");
    const LETTERS_CONTAINER = document.getElementById("letters-container");
    const HANGMAN_IMAGE = document.getElementById("hangman-image");
    const DYNAMIC_TITLE = document.getElementById("dynamic-title");
    const BUTTON_SUFIX = "-button-letter";

    let guessedLetters = [];
    let hangmanImage = 0;

    // Dibujar botones de las letras
    for (let i = 65; i <= 90; i++) {
        const LETTER = String.fromCharCode(i);
        const BUTTON = document.createElement("button");
        BUTTON.textContent = LETTER;
        BUTTON.id = LETTER + BUTTON_SUFIX;
        BUTTON.classList.add("letter-button");
        LETTERS_CONTAINER.appendChild(BUTTON);

        if (LETTER === 'N') {
            const BUTTON_N_WITH_TILDE = document.createElement("button");
            BUTTON_N_WITH_TILDE.textContent = "Ñ";
            BUTTON_N_WITH_TILDE.id = "Ñ" + BUTTON_SUFIX;
            BUTTON_N_WITH_TILDE.classList.add("letter-button");
            LETTERS_CONTAINER.appendChild(BUTTON_N_WITH_TILDE);
        }
    }

    // Traer la palabra del día
    async function getHangmanWord() {
        try {
            const RESPONSE = await fetch('static/jsons/hangman/words_2023.json');
            if (!RESPONSE.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }

            const DATA = await RESPONSE.json();
            let date = new Date();
            let month = date.toLocaleString('en-US', { month: 'long' });
            let day = date.getDate().toString();

            return DATA[month.toLowerCase()][day];

        } catch (error) {
            console.error(error);
        }
    }

    let word = await getHangmanWord();
    let selectedWord = word.word.toUpperCase();
    let selectedWordDefinition = word.definition;

    // LocalStorage: compruebo si el usuario ya jugó hoy
    try {
        let savedGame = localStorage.getItem("hangman");

        if (savedGame) {
            let savedGameData = JSON.parse(savedGame);
            const DATE = new Date();
            let d = DATE.getDate();
            let m = DATE.getMonth();
            let y = DATE.getFullYear();
            let dateNow = `${d}/${m}/${y}`

            if (savedGameData && savedGameData.date === dateNow) {
                if (savedGameData.succeeded === true) {
                    DYNAMIC_TITLE.innerHTML = "¡Muy bien! &#127894;";
                    LETTERS_CONTAINER.innerHTML = selectedWordDefinition;
                    WORD_DISPLAY.textContent = selectedWord;
                    hangmanImage = 7;
                    updateHangmanImage();
                    return;
                } else if ((savedGameData.succeeded === false)) {
                    DYNAMIC_TITLE.innerHTML = "Fallaste &#128128; ¡Prueba mañana!";
                    LETTERS_CONTAINER.innerHTML = selectedWordDefinition;
                    WORD_DISPLAY.textContent = selectedWord;
                    hangmanImage = 6;
                    updateHangmanImage();
                    return;
                } else {
                    guessedLetters = savedGameData.guessedLetters;
                    hangmanImage = savedGameData.hangmanImage;

                    for (let letter of guessedLetters) {
                        const BUTTON_LETTER = document.getElementById(letter + BUTTON_SUFIX);
                        BUTTON_LETTER.classList.add('disabled');

                        if (selectedWord.includes(letter)) {
                            BUTTON_LETTER.classList.add('correct');
                        } else {
                            BUTTON_LETTER.classList.add('incorrect');
                        }

                        updateHangmanImage();
                    }
                    displayWord();
                }
            }
        }
    } catch (error) {
        console.error(error);
    }

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
        WORD_DISPLAY.textContent = displayText;
    }

    function updateHangmanImage() {
        const CURRENT_SCHEME = window.location.protocol;
        const IMAGE_PATH = "static/images/hangman/" + hangmanImage + ".png";
        const IMAGE_URL = CURRENT_SCHEME + "//" + window.location.host + "/" + IMAGE_PATH;
        HANGMAN_IMAGE.src = IMAGE_URL;
    }

    function checkWin() {
        if (!WORD_DISPLAY.textContent.includes("_")) {
            DYNAMIC_TITLE.innerHTML = "¡Muy bien! &#127894;";
            LETTERS_CONTAINER.innerHTML = selectedWordDefinition;
            hangmanImage = 7;
            updateHangmanImage();

            // Guardar en localStorage que ha ganado
            saveResult(true);
        }
    }

    function checkLose() {
        if (hangmanImage === 6) {
            DYNAMIC_TITLE.innerHTML = "Fallaste &#128128; ¡Prueba mañana!";
            LETTERS_CONTAINER.innerHTML = selectedWordDefinition;
            WORD_DISPLAY.textContent = selectedWord;

            // Guardar en localStorage que ha perdido
            saveResult(false);
        }
    }

    LETTERS_CONTAINER.addEventListener("click", function (event) {
        if (event.target.classList.contains("letter-button")) {
            let letter = event.target.textContent.toUpperCase();

            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter);
                event.target.classList.add('disabled');

                displayWord();

                if (!selectedWord.includes(letter)) {
                    event.target.classList.add('incorrect');
                    hangmanImage++;
                    saveResult(null);
                    updateHangmanImage();
                    checkLose();
                } else {
                    event.target.classList.add('correct');
                    saveResult(null);
                    checkWin();
                }
            }
        }
    });

    displayWord();

    function saveResult(result) {

        const DATE = new Date();
        let d = DATE.getDate();
        let m = DATE.getMonth();
        let y = DATE.getFullYear();
        let dateForSave = `${d}/${m}/${y}`

        let savedGame = {
            "date": dateForSave,
            "guessedLetters": guessedLetters,
            "hangmanImage": hangmanImage,
            "succeeded": result
        };

        localStorage.setItem("hangman", JSON.stringify(savedGame));
    }

    // function addShareButton() {

    //     // if (navigator.share) {
    //         const SHARE_BUTTON = document.createElement("button");
    //         SHARE_BUTTON.textContent = "Compartir";
    //         SHARE_BUTTON.id = "BUTTON_SHARE";
    //         SHARE_BUTTON.classList.add("share-button");
    //         WORD_DISPLAY.appendChild(SHARE_BUTTON);

    //         SHARE_BUTTON.addEventListener("click", () => {
    //             alert("hola");
    //             // var text = "¡Echa un vistazo a esta página web increíble!";
    //             // var url = window.location.href;

    //             // var datosCompartir = {
    //             //     title: document.title,
    //             //     text: text,
    //             //     url: url,
    //             // };

    //             // navigator.share(datosCompartir)
    //             //     .then(function () {
    //             //         console.log("Contenido compartido con éxito");
    //             //     })
    //             //     .catch(function (error) {
    //             //         console.error("Error al compartir:", error);
    //             //     });
    //         });

    //     // } else {
    //     //     console.error("La API de Web Share no está soportada en este navegador.");
    //     // }
    // }
});