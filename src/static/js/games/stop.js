import { removeAccentMark, saveResultInLocalStorage } from './utils_games.js';

document.addEventListener("DOMContentLoaded", async () => {

    const CATEGORIES = {
        'animals': 'Animal',
        'body': 'Cuerpo humano',
        'capitals': 'Capital de País',
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
    const SPAN_SUFIX = '-category-option-span';
    const MAX_GAME_TIME = Math.round(NUM_GAME_CATEGORIES) * 14;
    const REGEX_IS_CORRECT_WORD = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ '.-]+$/;
    // const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
    const ALPHABET_MESSY = 'cqekwpnrlubvsfjdxoyimagzhtcmsefanj';

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
                COUNTER_CORRECT_ANSWERS.textContent = `Hoy has hecho ${savedGameData.correct_answers} correctas`;
                COUNTER_INCORRECT_ANSWERS.textContent = `y ${savedGameData.incorrect_answers} incorrectas`;
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
            let editText = document.createElement("input");

            editText.type = "text";
            editText.id = category + INPUT_SUFIX;
            editText.name = category;
            editText.autocomplete = "off";
            editText.placeholder = CATEGORIES[category];
            editText.style.display = "block";

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
        const DATE = new Date();
        const d = DATE.getDate() - 1;

        randomLetter = ALPHABET_MESSY[d];

        // if (d > 26) {
        //     randomLetter = ALPHABET_MESSY[d - 26];
        // } else {
        //     randomLetter = ALPHABET_MESSY[d];
        // }
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
            let result = await checkAnswer(category, CATEGORY_INPUT.value);

            if (result === true) {
                correctAnswers++;
                CATEGORY_INPUT.classList.add("input-correct");
            } else {
                incorrectAnswers++;
                CATEGORY_INPUT.classList.add("input-incorrect");

                for (let option of result) {
                    let spanOption = document.createElement("span");
                    spanOption.type = "span";
                    spanOption.id = category + SPAN_SUFIX;
                    spanOption.style.display = "block";
                    spanOption.textContent = option;
                    spanOption.classList.add("span-option");

                    CATEGORY_INPUT.insertAdjacentElement('afterend', spanOption);
                }
            }
        }

        COUNTER_CORRECT_ANSWERS.textContent = `Correctas: ${correctAnswers}`;
        COUNTER_INCORRECT_ANSWERS.textContent = `Incorrectas: ${incorrectAnswers}`;

        let obj = {
            "randomLetter": randomLetter,
            "correct_answers": correctAnswers,
            "incorrect_answers": incorrectAnswers
        };

        saveResultInLocalStorage("stop", obj);
    }

    async function checkAnswer(category, answer) {

        if (answer && answer.trim()) {

            // Eliminar los acentos
            answer = removeAccentMark(answer);
            // Eliminar puntos, guiones, comillas y espacios
            answer = answer.replace(/[.\- ']/g, ' ');
            // Eliminar espacios a los lados
            answer = answer.trim();
            // Coger únicamente la primera palabra si es compuesta
            answer = answer.split(' ')[0];

            if (REGEX_IS_CORRECT_WORD.test(answer)) {
                answer = answer.toLowerCase();

                if (answer.startsWith(randomLetter)) {
                    if (await isAnswerInCategory(category, answer)) {
                        return true;
                    }
                }
            }
        }

        return await getOptionForCategory(category);
    }

    async function isAnswerInCategory(category, answer) {

        let categoryItems = await getCategoryItemsFromFile(category);
        // Eliminar los acentos
        categoryItems = categoryItems.map((item) => removeAccentMark(item));
        // Eliminar carácteres especiales y espacios
        categoryItems = categoryItems.map((item) => item.replace(/[.\-\/#!$%^&*;:{}=\-_'´`~()]/g, ' ').replace(/\s+/g, ' '));
        // Eliminar espacios a los lados
        categoryItems = categoryItems.map((item) => item.trim());
        // Coger únicamente la primera palabra si es compuesta
        categoryItems = categoryItems.map((item) => item.split(' ')[0]);

        // Variantes de la palabra
        let answerWithO = answer.substring(0, (answer.length - 1)) + "o";
        let answerWithA = answer.substring(0, (answer.length - 1)) + "a";
        let answerWithS = answer + "s";
        let answerWithoutS = answer.substring(0, (answer.length - 1));

        if (categoryItems.includes(answer) ||
            categoryItems.includes(answerWithO) ||
            categoryItems.includes(answerWithA) ||
            categoryItems.includes(answerWithS) ||
            categoryItems.includes(answerWithoutS)) {

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

    async function getCategoryItemsFromFile(category) {

        try {
            const JSON_FILE = await fetch(`../static/jsons/stop/${category}.json`);

            if (!JSON_FILE.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }

            const DATA = await JSON_FILE.json();
            let categoryItems = DATA[category];

            return categoryItems;

        } catch (error) {
            console.error(error);
        }
    }

    async function getOptionForCategory(category) {
        let categoryItems = await getCategoryItemsFromFile(category);
        return await categoryItems.filter(item => item.startsWith(randomLetter)).slice(0, 2);
    }
});