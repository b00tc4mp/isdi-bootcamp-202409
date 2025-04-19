console.log("TEST at")

var at = function (iterable, index) {
    // buscar en el iterable el elemento que se encuentra en el index
    // siempre te va a devolver undefined si no encuentra el index

    if (index > -1) {
        return iterable[Math.floor(index)]
    }
    else {
        return iterable[iterable.length + (Math.ceil(index))]
    }

}



console.log('CASE locate kale from veggies')

var veggies = { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5 }
var veggie = at(veggies, 3)
console.log(veggie)
// kale

console.log('CASE locate green from colors')

var colors = { 0: 'red', 1: 'green', 2: 'blue', 3: 'yellow', length: 4 }
var color = at(colors, -3)
console.log(color)
// green

console.log('CASE get number at index 3 in nums')

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5 }

var num = at(nums, 3)
console.log(num)
// 400
