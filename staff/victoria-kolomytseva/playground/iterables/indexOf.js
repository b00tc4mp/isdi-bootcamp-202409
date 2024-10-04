var indexOf = function (iterable, element, fromIndex) {
    //Recorrer el iterable en busca del elemento
    //Si coinciden, devuelves el indice de ese elemento
    //Si no lo encuentra, devulve -1
    // Si existe el argumento fromIndex empezar la busqueda a partir del mismo

    var i = 0;

    if (fromIndex < 0) {
        i = iterable.length + fromIndex;
    }

    for (i; i < iterable.length; i++) {
        if (iterable[i] === element) {
            return i;
        }
    }
    return -1;

}


console.log('CASE find the index of value 1')

const nums = { 0: 5, 1: 3, 2: 4, 3: 12, 4: 1, 5: 8, 6: 1, length: 7 };
console.log(indexOf(nums, 1));
//Expected output: 4


console.log('CASE find the index of value 1 starting at -2')

// Start from index 2
console.log(indexOf(nums, 1, -2));
//Expected output: 6


console.log('CASE find the index of value 14')

console.log(nums.indexOf(14))
// Expected output: -1