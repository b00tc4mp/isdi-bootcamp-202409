let autor = "Francisco S."
let fecha = new Date();
console.log(fecha);



const yyyy = fecha.getFullYear();

let mm = fecha.getMonth() + 1; // Months start at 0!
let dd = fecha.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;
console.log(formattedToday);



//document.getElementById('DATE').value = formattedToday;