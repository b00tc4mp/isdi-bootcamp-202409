var indexOf = function (iterable, element, fromIndex) {
    /*
    Recorer el iterable en busca del elemento
    Si coinciden, devuelves el indice de ese elemento.
    Si no lo encuentra, return -1.
    Si existe el argumento startIndex comenzar la busqueda a partir de ahí.
    */

    if (!fromIndex) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }

    for (var i = fromIndex; i < iterable["length"]; i++) {
        if (iterable[i] === element) {
            return i;
        }
   }
   return -1;
}

console.log("CASE locate the index of the value 8")

var numbers = {
    0: 2,
    1: 4,
    2: 8,
    3: 16,
    4: 32,
    5: 8,
    length: 6
} 

var index = indexOf(numbers, 8);
console.log(index);
// Expected output: 2

console.log("CASE value 17 not found");
index = indexOf(numbers, 17);
console.log(index);
//Expected output: -1

console.log("CASE locate the index of the second value 8")
index = indexOf(numbers, 8, 3);

console.log("CASE locate the index from a negative value");
index = indexOf(numbers, 4, -6);