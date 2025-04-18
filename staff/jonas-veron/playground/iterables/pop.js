    /*
    extract last element from iterable
    descrease length from iterable
    delete last element from iterable
    return extracted element
    */

var pop = function(iterable){
    var last = iterable[iterable.length-1]
    delete iterable[iterable.length-1]
    iterable.length--
    return last
}



var veggies = {
    0: 'broccoli',
    1: 'cauliflower',
    2: 'cabbage',
    3: 'kale',
    4: 'tomato',
    length: 5
}
var veggie = pop(veggies)

console.log(veggies)
// { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', length: 4 }

console.log(veggie)
//tomato

console.log('CASE extract yellow from colors')

var colors = {
    0: 'red',
    1: 'green',
    2: 'blue',
    3: 'yellow',
    length: 4
}
var color = pop(colors)
// { 0: 'red', 1: 'green', 2: 'blue', length: 3 }
console.log(colors)
// yellow
