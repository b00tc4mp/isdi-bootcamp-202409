var indexOf = function (iterable, element, fromIndex) {
    //Recorrer el iterable en busca del elemento
    //Si coincide, devuelve el indice de ese elemento
    //Si no encuentra el elemento, retorna -1
    //Si existe el argumento fromIndex emepezar la busqueda a partir del mismo

    if (!fromIndex) {
        fromIndex = 0
    }
    else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }

    for (var i = fromIndex; i < iterable['length']; i++) {
        if (iterable[i] === element) {
            return i
        }
    }
    return -1
}

console.log('TEST indexOf')

console.log('CASE locate the index of cabbage in veggies')

var veggies = { 0: 'cabbage', 1: 'cauliflower', 2: 'tomato', 3: 'cabbage', 4: 'kale', length: 5 }
var veggie = indexOf(veggies, 'cabbage')

console.log(veggie)
//Expected output: 0

console.log('CASE the value of broccoli not found')

veggie = indexOf(veggies, 'broccoli')
console.log(veggie)
//Expected output: -1

console.log('CASE #3')

veggie = indexOf(veggies, 'cabbage', 1)
console.log(veggie)