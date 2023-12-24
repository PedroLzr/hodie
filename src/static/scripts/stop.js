document.addEventListener("DOMContentLoaded", async function () {

    const CATEGORIES = {
        'animals': 'Animal',
        'body': 'Cuerpo humano',
        'capitals': 'Capital',
        'car_brands': 'Marca de coche',
        'chemical_elements': 'Elemento químico',
        'colors': 'Color',
        'countries': 'País',
        'drinks': 'Bebida',
        'fruits': 'Fruta',
        'games': 'Juego',
        'home_objects': 'Objeto del hogar',
        'jobs': 'Oficio',
        'languages': 'Idioma',
        'minerals': 'Mineral',
        'multinational': 'Multinacional',
        'music_styles': 'Estilo musical',
        'names': 'Nombre propio',
        'sports': 'Deporte',
        'vegetables': 'Verdura'
    }
    const START_BUTTON = document.getElementById('start-button');
    const STOP_BUTTON = document.getElementById('stop-button');
    const GAME_CONTAINER = document.getElementById('game-container');
    const LETTER_LABEL = document.getElementById('letter-selected');
    const COUNTER_CORRECT_ANSWERS = document.getElementById('correctAnswers');
    const COUNTER_INCORRECT_ANSWERS = document.getElementById('incorrectAnswers');
    const CATEGORIES_CONTAINER = document.getElementById('categories-container');
    const PROGRESS_BAR = document.getElementById('progressBar');
    const PROGRESS_BAR_TIMER = document.getElementById('progressBarTimer');
    const NUM_GAME_CATEGORIES = Math.round(Object.keys(CATEGORIES).length / 3);
    const INPUT_SUFIX = '-category-input';
    const MAX_GAME_TIME = Math.round(NUM_GAME_CATEGORIES) * 13;
    const REGEX_IS_CORRECT_WORD = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ '.-]+$/;

    let arrayCategories = Object.keys(CATEGORIES);
    let timeLeft = MAX_GAME_TIME;
    let randomLetter = '';
    let randomCategories = [];
    let stopGame = false;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    try {

        let savedGame = localStorage.getItem("stop");

        if (savedGame) {
            let savedGameData = JSON.parse(savedGame);
            const DATE = new Date();
            let d = DATE.getDate();
            let m = DATE.getMonth();
            let y = DATE.getFullYear();
            let dateNow = `${d}/${m}/${y}`

            if (savedGameData && savedGameData.date === dateNow) {
                START_BUTTON.style.display = "none";
                STOP_BUTTON.style.display = "none";
                PROGRESS_BAR.style.display = "none";
                GAME_CONTAINER.style.display = "block";
                LETTER_LABEL.textContent = savedGameData.randomLetter;
                COUNTER_CORRECT_ANSWERS.textContent = `Correctas: ${savedGameData.correct_answers}`;
                COUNTER_INCORRECT_ANSWERS.textContent = `Incorrectas: ${savedGameData.incorrect_answers}`;
            }
        }

    } catch (error) {
        console.error(error);
    };

    START_BUTTON.addEventListener('click', async () => {
        START_BUTTON.style.display = "none";

        await setRandomLetter();
        await setRandomCategories();

        LETTER_LABEL.textContent = randomLetter;

        for (let category of randomCategories) {
            var editText = document.createElement("input");

            editText.type = "text";
            editText.id = category + INPUT_SUFIX;
            editText.name = category;
            editText.placeholder = CATEGORIES[category];

            CATEGORIES_CONTAINER.append(editText);
        }

        GAME_CONTAINER.style.display = "block";
        START_BUTTON.disabled = true;

        progress();
    });

    STOP_BUTTON.addEventListener('click', () => {
        PROGRESS_BAR_TIMER.style.backgroundColor = "#25db12";
        finishGame();
    });

    async function setRandomLetter() {
        const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
        randomLetter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }

    async function setRandomCategories() {

        for (let i = 0; i < NUM_GAME_CATEGORIES; i++) {

            if (arrayCategories.length === 0) {
                break;
            }

            const RANDOM_INDEX = Math.floor(Math.random() * arrayCategories.length);
            const RANDOM_CATEGORY = arrayCategories[RANDOM_INDEX];
            arrayCategories.splice(RANDOM_INDEX, 1);

            let categoryItems = await getCategoryItemsFromFile(RANDOM_CATEGORY);

            let haveItem = categoryItems.some((item) => item.startsWith(randomLetter));

            if (haveItem) {
                randomCategories.push(RANDOM_CATEGORY);
            } else {
                i--;
            }

        }
    }

    async function finishGame() {
        stopGame = true;
        STOP_BUTTON.style.display = "none";

        for (let category of randomCategories) {
            const CATEGORY_INPUT = document.getElementById(category + INPUT_SUFIX);
            CATEGORY_INPUT.disabled = true;
            let isCorrect = await checkAnswer(category, CATEGORY_INPUT.value);

            if (isCorrect) {
                correctAnswers++;
                CATEGORY_INPUT.classList.add("input-correct");
            } else {
                incorrectAnswers++;
                CATEGORY_INPUT.classList.add("input-incorrect");
            }
        }

        COUNTER_CORRECT_ANSWERS.textContent = `Correctas: ${correctAnswers}`;
        COUNTER_INCORRECT_ANSWERS.textContent = `Incorrectas: ${incorrectAnswers}`;

        saveResult();
    }

    function saveResult() {

        const DATE = new Date();
        let d = DATE.getDate();
        let m = DATE.getMonth();
        let y = DATE.getFullYear();
        let dateForSave = `${d}/${m}/${y}`

        let savedGame = {
            "date": dateForSave,
            "randomLetter": randomLetter,
            "correct_answers": correctAnswers,
            "incorrect_answers": incorrectAnswers
        };

        localStorage.setItem("stop", JSON.stringify(savedGame));
    }

    async function checkAnswer(category, answer) {

        if (answer && answer.trim()) {

            // Eliminar espacios a los lados
            answer = answer.trim();
            // Eliminar los acentos
            answer = removeAccentMark(answer);
            // Eliminar puntos, guiones, comillas y espacios
            answer = answer.replace(/[.\- ']/g, '');

            if (REGEX_IS_CORRECT_WORD.test(answer)) {
                answer = answer.toLowerCase();

                if (answer.startsWith(randomLetter)) {
                    return await isAnswerInCategory(category, answer);
                }
            }
        }

        return false;
    }

    async function isAnswerInCategory(category, answer) {

        let categoryItems = await getCategoryItemsFromFile(category);

        // Variantes de la palabra
        // let answerWithO;
        // let answerWithA;
        // let answerWithS;
        // let answerWithoutS;

        if (categoryItems.includes(answer)) {
            return true;
        } else {
            return false;
        }
    }

    function progress() {

        if (timeLeft <= 0) {
            PROGRESS_BAR_TIMER.innerHTML = "0:00";
            PROGRESS_BAR_TIMER.style.width = "100%";
            finishGame();
            return;
        }

        if (timeLeft === 15) {
            PROGRESS_BAR_TIMER.style.backgroundColor = "#db0808";
        }

        if (!stopGame) {
            // Barra de progreso
            let progressBarWidth = (timeLeft / MAX_GAME_TIME) * PROGRESS_BAR.clientWidth;
            PROGRESS_BAR_TIMER.style.width = progressBarWidth + 'px';

            // Contador de tiempo
            let minutes = Math.floor(timeLeft / 60);
            let seconds = Math.floor(timeLeft % 60);
            PROGRESS_BAR_TIMER.innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

            timeLeft--;
            setTimeout(progress, 1000);
        }
    }

    function removeAccentMark(word) {
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    async function getCategoryItemsFromFile(category) {

        try {
            const JSON_FILE = await fetch(`static/jsons/stop/${category}.json`);

            if (!JSON_FILE.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }

            const DATA = await JSON_FILE.json();
            let categoryItems = DATA[category];

            // Eliminar los acentos
            categoryItems = categoryItems.map((item) => removeAccentMark(item));
            // Eliminar carácteres especiales y espacios
            categoryItems = categoryItems.map((item) => item.replace(/[.\-\/#!$%^&*;:{}=\-_'~()]/g, '').replace(/\s+/g, ''));

            return categoryItems;

        } catch (error) {
            console.error(error);
        }
    }
});