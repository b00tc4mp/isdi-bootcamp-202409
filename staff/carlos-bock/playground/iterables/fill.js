//si hay un parametro reemplaza todo
//si hay dos parametros el segundo es el indice para comenzar
//si hay tres parametros el tercero el la condición de freno

console.log("Test fill");

var fill = function (iterable, value, start, end) {
    
    for (var i = (start === undefined ? 0 : start); 
        i < (end === undefined ? iterable.length : end); 
        i++) {
        iterable[i] = value;
        };
    return iterable;
};

console.log("CASE replace all values with 6");
var numbers = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    length: 5
}
console.log(fill(numbers,6));
// { '0': 6, '1': 6, '2': 6, '3': 6, '4': 6, length: 5 }

console.log("CASE replace values afer 1 with 5")
var numbers = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    length: 5
}
console.log(fill(numbers, 5, 1));
//Expected output: { '0': 1, '1': 5, '2': 5, '3': 5, '4': 5, length: 5 }

console.log("CASE replace values 3 and 4 with 0")
var numbers = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    length: 5
}
console.log(fill(numbers,0,2,4))
// Expected output: { '0': 1, '1': 2, '2': 0, '3': 0, '4': 5, length: 5 }



