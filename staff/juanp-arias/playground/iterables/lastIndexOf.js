console.log('TEST lastIndexOf')
var lastIndexOf = function (iterable, searchElement, fromIndex) {

    if (fromIndex === undefined) {
        fromIndex = iterable.length - 1;


    } else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex;
    }

    for (var i = fromIndex; i >= 0; i--) {
        if (iterable[i] === searchElement) {
            return i;
        }
    }

    return -1;
}

console.log('CASE searching names')


var alumnos = {
    0: "Lucía González",
    1: "Santiago Pérez",
    2: "Ana Martínez",
    3: "Carlos Ruiz",
    4: "Lucía González",
    5: "Javier Sánchez",
    6: "Laura García",
    length: 7
};

console.log(alumnos);

console.log(' search for "Carlos Ruiz" we will obtain 3');
console.log(lastIndexOf(alumnos, 'Carlos Ruiz'));
// Expected output: 3


console.log('When we search for "Lucía González" with index 4 we will obtain 4');
console.log(lastIndexOf(alumnos, 'Lucía González', 4));
// Expected output: 4


console.log('When we search for "Lucía González" with index -2 we will obtain 4');
console.log(lastIndexOf(alumnos, 'Lucía González', -2));
// Expected output: 4

console.log('When we search for "Lucía González" with index -4 we will obtain 4');
console.log(lastIndexOf(alumnos, 'Lucía González', -4));
// Expected output: 4

console.log('When we search for "Lucía González" with index Z we will obtain -1');
console.log(lastIndexOf(alumnos, 'Lucía González', 'Z'));
// Expected output: 4