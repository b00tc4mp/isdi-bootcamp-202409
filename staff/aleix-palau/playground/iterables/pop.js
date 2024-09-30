var pop = function (iterable) {
    var poppedPlant = iterable[iterable.length - 1]
    delete iterable[iterable.length - 1]
    iterable.length--

    return poppedPlant
}

console.log('TEST pop')

console.log('CASE extract "tomato" from plants')

var plants = { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5 }
var plant = pop(plants)

console.log(plants)
// { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', length: 4 }
console.log(plant)
// tomato