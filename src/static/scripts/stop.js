document.addEventListener("DOMContentLoaded", async function () {

    const CATEGORIES = {
        'animals': 'Animal',
        'capitals': 'Capital',
        'colors': 'Color',
        'countries': 'País',
        'fruits': 'Fruta',
        'jobs': 'Oficio',
        'names': 'Nombre propio',
        'vegetables': 'Verdura',
        'car_brands': 'Marca de coche',
        'home_objects': 'Objeto del hogar',
        'sports': 'Deporte',
        'chemical_elements': 'Elemento químico',
        'drinks': 'Bebida',
        'games': 'Juego',
        'languages': 'Idioma',
        'minerals': 'Mineral',
        'music_styles': 'Estilo musical',
    }

    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const gameContainer = document.getElementById('game-container');
    const letterLabel = document.getElementById('letter-selected');
    const counterCorrectAnswers = document.getElementById('correctAnswers');
    const counterIncorrectAnswers = document.getElementById('incorrectAnswers');
    const categoriesContainer = document.getElementById('category-inputs');
    const progressBar = document.getElementById('progressBar');
    const progressBarTimer = document.getElementById('progressBarTimer');

    let arrayCategories = Object.keys(CATEGORIES);
    const NUM_GAME_CATEGORIES = Math.round(Object.keys(CATEGORIES).length / 3);
    const INPUT_SUFIX = '-input';
    const MAX_GAME_TIME = Math.round(NUM_GAME_CATEGORIES) * 12;
    let timeLeft = MAX_GAME_TIME;

    // const REGEX_IS_CORRECT_WORD = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ]+$/;
    const REGEX_IS_CORRECT_WORD = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ .-]+$/;

    let randomLetter = '';
    let randomCategories = [];

    let stopGame = false;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    async function setRandomLetter() {
        const alphabet = 'abcdefghijklmnñopqrstuvwxyz';
        randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    async function setRandomCategories() {

        for (let i = 0; i < NUM_GAME_CATEGORIES; i++) {
            const randomIndex = Math.floor(Math.random() * arrayCategories.length);
            const randomCategory = arrayCategories[randomIndex];
            arrayCategories.splice(randomIndex, 1);

            let categoryItems = await getCategoryItemsFromFile(randomCategory);

            let haveItem = categoryItems.some((item) => item.startsWith(randomLetter));

            if (haveItem) {
                randomCategories.push(randomCategory);
            } else {
                i--;
            }
        }
    }

    startButton.addEventListener('click', async () => {
        startButton.style.display = "none";

        await setRandomLetter();
        await setRandomCategories();

        letterLabel.textContent = randomLetter;

        for (let category of randomCategories) {
            var editText = document.createElement("input");

            editText.type = "text";
            editText.id = category + INPUT_SUFIX;
            editText.name = category;
            editText.placeholder = CATEGORIES[category];

            categoriesContainer.append(editText);
        }

        gameContainer.style.display = "block";
        startButton.disabled = true;

        progress();

        setTimeout(() => {
            if (!stopGame) {
                finishGame();
            }
        }, MAX_GAME_TIME * 1000);
    });

    stopButton.addEventListener('click', () => {
        finishGame();
    });

    async function finishGame() {
        stopGame = true;
        stopButton.style.display = "none";

        for (let category of randomCategories) {
            const categoryInput = document.getElementById(category + INPUT_SUFIX);
            categoryInput.disabled = true;
            let isCorrect = await checkAnswer(category, categoryInput.value);

            if (isCorrect) {
                correctAnswers++;
                categoryInput.style.borderColor = "#00ff00";
            } else {
                incorrectAnswers++;
                categoryInput.style.borderColor = "#ff0000";
            }
        }

        counterCorrectAnswers.textContent = `Correctas: ${correctAnswers}`;
        counterIncorrectAnswers.textContent = `Incorrectas: ${incorrectAnswers}`;
    }

    async function checkAnswer(category, answer) {

        if (answer && answer.trim()) {

            // Eliminar espacios a los lados
            answer = answer.trim();
            // Eliminar los acentos
            answer = removeAccentMark(answer);
            // Eliminar puntos, guiones y espacios
            answer = answer.replace(/[.\- ]/g, '');

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

        // Barra de progreso
        var progressBarWidth = (timeLeft / MAX_GAME_TIME) * progressBar.clientWidth;
        progressBarTimer.style.width = progressBarWidth + 'px';

        // Contador de tiempo
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        progressBarTimer.innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        if (timeLeft > 0 && !stopGame) {
            timeLeft--;
            setTimeout(progress, 1000);
        }
    }

    function removeAccentMark(word) {
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    async function getCategoryItemsFromFile(category) {

        try {
            const jsonFile = await fetch(`static/jsons/stop/${category}.json`);

            if (!jsonFile.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }

            const data = await jsonFile.json();
            let categoryItems = data[category];

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