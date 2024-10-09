var pop = function (iterable) {
    /*
    iterable -> { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5 }
    element -> tomato
    return element
    extract last element
    iterable -> { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', length: 5 }
    return iterable with last element deleted and new length
    iterable -> { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', length: 4 }
    return extracted element
    tomato
    */

    var element = iterable[iterable.length - 1]

    delete iterable[iterable.length - 1]
    iterable.length--

    return element
}


console.log('TEST pop')

console.log('CASE extract tomato from veggies')

var veggies = { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5 }
var veggie = pop(veggies)

console.log(veggies)
// { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', length: 4 }
console.log(veggie)
// tomato

console.log('CASE extract yellow from colors')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 }
var color = pop(colors)

console.log(colors)
// { 0: 'red', 1: 'green', 2: 'blue', length: 3 }
console.log(color)
//yellow