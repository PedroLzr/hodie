import { getRandomNumber, saveResultInLocalStorage } from './utils.js';

document.addEventListener("DOMContentLoaded", async () => {

    const START_BUTTON = document.getElementById('start-button');
    const STOP_BUTTON = document.getElementById('stop-button');
    const GAME_CONTAINER = document.getElementById('game-container');
    const OPERATIONS_CONTAINER = document.getElementById('operations-container');
    const NUMBER_LABEL = document.getElementById('number-selected');
    const COUNTER_CORRECT_ANSWERS = document.getElementById('correctAnswers');
    const COUNTER_INCORRECT_ANSWERS = document.getElementById('incorrectAnswers');
    const PROGRESS_BAR = document.getElementById('progressBar');
    const PROGRESS_BAR_TIMER = document.getElementById('progressBarTimer');

    const SUM_LABEL = document.getElementById('sum-label');
    const SUBSTRACTION_LABEL = document.getElementById('subtraction-label');
    const MULTIPLICATION_LABEL = document.getElementById('multiplication-label');
    const DIVISION_LABEL = document.getElementById('division-label');
    const POW_LABEL = document.getElementById('pow-label');
    const CUBE_LABEL = document.getElementById('cube-label');
    const SQRT_LABEL = document.getElementById('sqrt-label');
    const PERCENT_LABEL = document.getElementById('percent-label');

    const SUM_INPUT = document.getElementById('sum-input');
    const SUBSTRACTION_INPUT = document.getElementById('subtraction-input');
    const MULTIPLICATION_INPUT = document.getElementById('multiplication-input');
    const DIVISION_INPUT = document.getElementById('division-input');
    const POW_INPUT = document.getElementById('pow-input');
    const CUBE_INPUT = document.getElementById('cube-input');
    const SQRT_INPUT = document.getElementById('sqrt-input');
    const PERCENT_INPUT = document.getElementById('percent-input');

    const SUM_RESULT = document.getElementById('sum-result');
    const SUBSTRACTION_RESULT = document.getElementById('subtraction-result');
    const MULTIPLICATION_RESULT = document.getElementById('multiplication-result');
    const DIVISION_RESULT = document.getElementById('division-result');
    const POW_RESULT = document.getElementById('pow-result');
    const CUBE_RESULT = document.getElementById('cube-result');
    const SQRT_RESULT = document.getElementById('sqrt-result');
    const PERCENT_RESULT = document.getElementById('percent-result');

    const MAX_GAME_TIME = 120;

    let timeLeft = MAX_GAME_TIME;
    let randomNumber;
    let randomNumberSum;
    let randomNumberSubstraction;
    let randomNumberMultiplication;
    let randomNumberDivision;
    let randomNumberPercent;
    let stopGame = false;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    try {

        let savedGame = localStorage.getItem("stop_mat");

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
                OPERATIONS_CONTAINER.style.display = "none";
                GAME_CONTAINER.style.display = "block";
                NUMBER_LABEL.textContent = savedGameData.randomNumber;
                COUNTER_CORRECT_ANSWERS.textContent = `Hoy has hecho ${savedGameData.correct_answers} correctas`;
                COUNTER_INCORRECT_ANSWERS.textContent = `y ${savedGameData.incorrect_answers} incorrectas`;
            }
        }

    } catch (error) {
        console.error(error);
    };

    START_BUTTON.addEventListener('click', async () => {
        START_BUTTON.style.display = "none";

        setRandomNumbers();

        NUMBER_LABEL.innerHTML = randomNumber;
        SUM_LABEL.innerHTML = `<b>${randomNumber}</b> + ${randomNumberSum}`;
        SUBSTRACTION_LABEL.innerHTML = `<b>${randomNumber}</b> - ${randomNumberSubstraction}`;
        MULTIPLICATION_LABEL.innerHTML = `<b>${randomNumber}</b> x ${randomNumberMultiplication}`;
        DIVISION_LABEL.innerHTML = `<b>${randomNumber}</b> / ${randomNumberDivision}`;
        POW_LABEL.innerHTML = `<b>${randomNumber}</b><sup>2</sup>`;
        CUBE_LABEL.innerHTML = `<b>${randomNumber}</b><sup>3</sup>`;
        SQRT_LABEL.innerHTML = `√<b>${randomNumber}</b>`;
        PERCENT_LABEL.innerHTML = `${randomNumberPercent}% de <b>${randomNumber}</b>`;

        GAME_CONTAINER.style.display = "block";
        START_BUTTON.disabled = true;

        progress();
    });

    STOP_BUTTON.addEventListener('click', () => {
        PROGRESS_BAR_TIMER.style.backgroundColor = "#25db12";
        finishGame();
    });

    function setRandomNumbers() {
        randomNumber = getRandomNumber(11, 99);

        randomNumberSum = getRandomNumber(300, 999);
        randomNumberSubstraction = getRandomNumber(300, 999);
        randomNumberMultiplication = getRandomNumber(11, 99);
        randomNumberDivision = getRandomNumber(11, 30);
        randomNumberPercent = getRandomNumber(1, 9) * 10;
    }

    function finishGame() {
        stopGame = true;
        STOP_BUTTON.style.display = "none";

        let sumAnswer = SUM_INPUT.value;
        let substractionAnswer = SUBSTRACTION_INPUT.value;
        let multiplicationAnswer = MULTIPLICATION_INPUT.value;
        let divisionAnswer = DIVISION_INPUT.value;
        let powAnswer = POW_INPUT.value;
        let cubeAnswer = CUBE_INPUT.value;
        let sqrtAnswer = SQRT_INPUT.value;
        let percentAnswer = PERCENT_INPUT.value;

        SUM_INPUT.disabled = true;
        SUBSTRACTION_INPUT.disabled = true;
        MULTIPLICATION_INPUT.disabled = true;
        DIVISION_INPUT.disabled = true;
        POW_INPUT.disabled = true;
        CUBE_INPUT.disabled = true;
        SQRT_INPUT.disabled = true;
        PERCENT_INPUT.disabled = true;

        if ((randomNumber + randomNumberSum) == sumAnswer) {
            SUM_INPUT.classList.add("input-correct");
            correctAnswers++;
        } else {
            SUM_INPUT.classList.add("input-incorrect");
            SUM_RESULT.textContent = "Resultado correcto: " + (randomNumber + randomNumberSum);
            incorrectAnswers++;
        }

        if ((randomNumber - randomNumberSubstraction) == substractionAnswer) {
            SUBSTRACTION_INPUT.classList.add("input-correct");
            correctAnswers++;
        } else {
            SUBSTRACTION_INPUT.classList.add("input-incorrect");
            SUBSTRACTION_RESULT.textContent = "Resultado correcto: " + (randomNumber - randomNumberSubstraction);
            incorrectAnswers++;
        }

        if ((randomNumber * randomNumberMultiplication) == multiplicationAnswer) {
            MULTIPLICATION_INPUT.classList.add("input-correct");
            correctAnswers++;
        } else {
            MULTIPLICATION_INPUT.classList.add("input-incorrect");
            MULTIPLICATION_RESULT.textContent = "Resultado correcto: " + (randomNumber * randomNumberMultiplication);
            incorrectAnswers++;
        }

        if (Math.trunc((randomNumber / randomNumberDivision)) == Math.trunc(divisionAnswer)) {
            DIVISION_INPUT.classList.add("input-correct");
            correctAnswers++;
        } else {
            DIVISION_INPUT.classList.add("input-incorrect");
            let correctResult = randomNumber / randomNumberDivision;
            DIVISION_RESULT.textContent = "Resultado correcto: " + Math.trunc(correctResult);
            incorrectAnswers++;
        }

        if (Math.pow(randomNumber, 2) == powAnswer) {
            POW_INPUT.classList.add("input-correct");
            correctAnswers++;
        } else {
            POW_INPUT.classList.add("input-incorrect");
            POW_RESULT.textContent = "Resultado correcto: " + Math.pow(randomNumber, 2);
            incorrectAnswers++;
        }

        if (Math.pow(randomNumber, 3) == cubeAnswer) {
            CUBE_INPUT.classList.add("input-correct");
            correctAnswers++;
        } else {
            CUBE_INPUT.classList.add("input-incorrect");
            CUBE_RESULT.textContent = "Resultado correcto: " + Math.pow(randomNumber, 3);
            incorrectAnswers++;
        }

        if (Math.trunc(Math.sqrt(randomNumber)) == Math.trunc(sqrtAnswer)) {
            SQRT_INPUT.classList.add("input-correct");
            correctAnswers++;
        } else {
            SQRT_INPUT.classList.add("input-incorrect");
            let correctResult = Math.sqrt(randomNumber);
            SQRT_RESULT.textContent = "Resultado correcto: " + Math.trunc(correctResult);
            incorrectAnswers++;
        }

        if (Math.trunc(((randomNumber * randomNumberPercent) / 100)) == Math.trunc(percentAnswer)) {
            PERCENT_INPUT.classList.add("input-correct");
            correctAnswers++;
        } else {
            PERCENT_INPUT.classList.add("input-incorrect");
            let correctResult = (randomNumber * randomNumberPercent) / 100;
            PERCENT_RESULT.textContent = "Resultado correcto: " + Math.trunc(correctResult);
            incorrectAnswers++;
        }

        COUNTER_CORRECT_ANSWERS.textContent = `Correctas: ${correctAnswers}`;
        COUNTER_INCORRECT_ANSWERS.textContent = `Incorrectas: ${incorrectAnswers}`;

        let obj = {
            "randomNumber": randomNumber,
            "correct_answers": correctAnswers,
            "incorrect_answers": incorrectAnswers
        };

        saveResultInLocalStorage("stop_mat", obj);
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
});