var at = function (iterable, index) {
    // buscar en iterable elemento en index
    // 
    if (index > -1) {
        return iterable[Math.floor(index)]
    } else {
        return iterable[iterable.length + Math.ceil(index)]
    }
}



console.log('CASE locate index 2 on veggies')

var veggies = { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5 }
var veggie = at(veggies, 3)
console.log(veggie)

console.log('CASE locate green from colors')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 }
var color = at(-2)
console.log(color)
