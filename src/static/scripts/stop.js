document.addEventListener("DOMContentLoaded", async function () {

    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const gameContainer = document.getElementById('game-container');
    const letterLabel = document.getElementById('letter-selected');
    const categoriesContainer = document.getElementById('category-inputs');
    const progressBar = document.getElementById('progressBar');
    const progressBarTimer = document.getElementById('progressBarTimer');

    let categories = ['animals', 'capitals', 'colors', 'countries', 'fruits', 'jobs', 'names', 'vegetables'];
    const NUM_CATEGORIES_GAME = categories.length / 3;
    const INPUT_SUFIX = '-input';
    const MAX_TIME_GAME_IN_SEGS = 30;
    let TIME_LEFT_IN_SEGS = MAX_TIME_GAME_IN_SEGS;

    const REGEX_CORRECT_WORD = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ]+$/;

    let randomLetter = '';
    let selectedCategories = [];

    let stopGame = false;

    function getRandomLetter() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    function getRandomCategory() {

        // TODO: Comprobar que para esa categoría existen opciones con la letra seleccionada

        const randomIndex = Math.floor(Math.random() * categories.length);
        const randomCategory = categories[randomIndex];
        categories.splice(randomIndex, 1);
        return randomCategory;
    }

    startButton.addEventListener('click', () => {
        startButton.style.display = "none";

        randomLetter = getRandomLetter();
        for (let i = 0; i < NUM_CATEGORIES_GAME; i++) {
            selectedCategories.push(getRandomCategory());
        }

        letterLabel.textContent = `Letra: ${randomLetter}`;

        for (let category of selectedCategories) {
            var editText = document.createElement("input");

            editText.type = "text";
            editText.id = category + INPUT_SUFIX;
            editText.name = category;
            editText.placeholder = category;

            categoriesContainer.append(editText);
        }

        gameContainer.style.display = "block";
        startButton.disabled = true;

        progress();

        setTimeout(() => {
            finishGame();
        }, MAX_TIME_GAME_IN_SEGS * 1000);
    });

    stopButton.addEventListener('click', () => {
        finishGame();
    });

    async function finishGame() {
        stopGame = true;
        stopButton.style.display = "none";

        for (let category of selectedCategories) {
            const categoryInput = document.getElementById(category + INPUT_SUFIX);
            categoryInput.disabled = true;
            let isCorrect = await checkAnswer(category, categoryInput.value);

            if (isCorrect) {
                categoryInput.style.borderColor = "#00ff00";
            } else {
                categoryInput.style.borderColor = "#ff0000";
            }
        }
    }

    async function checkAnswer(category, answer) {

        let letter = randomLetter.toLocaleLowerCase();

        if (answer && answer.trim()) {

            answer = answer.trim();
            answer = removeAccentMark(answer);

            if (REGEX_CORRECT_WORD.test(answer)) {
                answer = answer.toLowerCase();

                if (answer.startsWith(letter)) {
                    return await isAnswerInCategory(category, answer);
                } else {
                    return false;
                }
            } else {
                return false;
            }

        } else {
            return false;
        }

    }

    async function isAnswerInCategory(category, answer) {
        try {
            const categoryJson = await fetch(`static/jsons/stop/${category}.json`);
            if (!categoryJson.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }

            const data = await categoryJson.json();
            let options = data[category];

            options = options.map((item) => removeAccentMark(item));

            if (options.includes(answer)) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.error(error);
        }
    }

    function progress() {

        // Barra de progreso
        var progressBarWidth = (TIME_LEFT_IN_SEGS / MAX_TIME_GAME_IN_SEGS) * progressBar.clientWidth;
        progressBarTimer.style.width = progressBarWidth + 'px';

        // Contador de tiempo
        var minutes = Math.floor(TIME_LEFT_IN_SEGS / 60);
        var seconds = TIME_LEFT_IN_SEGS % 60;
        progressBarTimer.innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        if (TIME_LEFT_IN_SEGS > 0 && !stopGame) {
            TIME_LEFT_IN_SEGS--;
            setTimeout(progress, 1000);
        }
    }

    function removeAccentMark(word) {
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
});