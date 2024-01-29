var dateNow = new Date();

// Full date
var options = { year: 'numeric', month: 'long', weekday: 'long', day: 'numeric' };
var formattedDate = dateNow.toLocaleDateString('es-ES', options);

formattedDate = formattedDate[0].toUpperCase() + formattedDate.slice(1);
document.getElementById('dateToday').textContent = formattedDate;

// Small date
var optionsSmall = { year: 'numeric', month: 'numeric', day: 'numeric' };
var formattedDateSmall = dateNow.toLocaleDateString('es-ES', optionsSmall);

document.getElementById('dateTodaySmall').textContent = formattedDateSmall;