export function saveResultInLocalStorage(itemName, obj) {

    const DATE = new Date();
    let d = DATE.getDate();
    let m = DATE.getMonth();
    let y = DATE.getFullYear();
    let dateForSave = `${d}/${m}/${y}`

    obj.date = dateForSave;

    localStorage.setItem(itemName, JSON.stringify(obj));
}

export function removeAccentMark(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
