var at = function (iterable, index) {
    //buscar en el iterable el elemnto que se encuentra en el index
    //siempre te va a devolver indefined si no encuentra el index

    if (index > -1) {
        return iterable[Math.floor(index)]
    }
    else {
        return iterable[iterable.length + (Math.ceil(index))]
    }
}


console.log('CASE locate kale from veggies')
var veggies = { 0: 'broccoli', 1: 'califlower', 2: 'cabbage', 3: 'kale', length: 4 }
var veggie = at(veggies, 3)
console.log(veggie)
//kale

console.log('CASE locate green from colors')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 }
var color = at(colors, 1)
console.log(color)
//green