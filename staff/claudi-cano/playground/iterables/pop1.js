var pop = function (iterable) {
    var deleted = iterable[iterable.length - 1]
    delete iterable[iterable.length - 1]
    if (iterable.hasOwnProperty('length')) {
        iterable.length--
    } else return 'empty iterable detected'
    return deleted
}

console.log('TEST pop')

console.log('CASE extract tomato from veggies')

var veggies = { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5 };
var veggie = pop(veggies)

console.log(veggies)
// { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', length: 4};
console.log(veggie)
// tomato

console.log('CASE extract yellow from colors')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 }
var color = pop(colors)

console.log(colors)
// {0: 'red', 1: 'green', 2: 'blue', length: 3 }
console.log(color)
// yellow

console.log('CASE extract from empty iterable')

var numbers = {}
var number = pop(numbers)

console.log(numbers)
// {}
console.log(number)
//undefined