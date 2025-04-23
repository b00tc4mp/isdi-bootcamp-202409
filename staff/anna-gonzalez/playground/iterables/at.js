var atObject = function (iterable, index) {
    // Return a message if the index is not in the range
    if (index < -iterable.length || index >= iterable.length) {
        return 'Out of index'
        // Look for the value if it is a negative index
    } else if (index < 0) {
        return iterable[iterable.length + Math.ceil(index)]
        // Look for the value of the positive index
    } else {
        return iterable[Math.floor(index)]
    }
}

console.log('CASE get number at index 2 in numbers')

var numbers = { 0: 10, 1: 20, 2: 30, 3: 40, 4: 50, length: 5 }
var number = atObject(numbers, 2)

console.log(atObject(numbers, 2)) // It's the same than console.log(number)
// 30

console.log('CASE get kale at index 3 in veggies')

var veggies = { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5 }
var veggie = atObject(veggies, 3)

console.log(veggie)
// kale

console.log('CASE get green at index -3 in colours')

var colours = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 }
var colour = atObject(colours, -3)

console.log(colour)
// green