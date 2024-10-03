var pop = function  (iterable)  { 
    /*
    extract last element from iterable 
    decrease lenght from iterabe
    delete last element from iterable
    return extracted element
    */


var last = iterable[iterable.length - 1]

iterable.length--

delete iterable[iterable.length - 1]

iterable.length--

return last
}

console.log('TEST Array.prototype.pop')

conwssole.log('CASE extract tomato from veggie')

var veggies = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']
var vaggie = veggie.pop()

console.log(veggies)
//['broccoli', 'cauliflower', 'cabbage', 'kale']
console.log(veggie)
// tomato

console.log('CASE extract yellor from colors')

var colors = ['red', 'green', 'blue', 'yellow']
var color = colors.pop()

console.log(colors)
// red, green, blue
console.log(color) 
// yellow