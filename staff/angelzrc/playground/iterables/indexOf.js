var indexOf = function (iterable, value, fromIndex) {
    //itereate on iterable
    //if searchElement found then return index
    //otherwwise return -1

    if (!fromIndex) {
        fromIndex = 0

    } else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }


    for (let j = fromIndex; j < iterable.length; j++) {
        if (iterable[j] === value) {
            return j
        }

    } return -1
}




console.log('CASE find the index of first instance of "cabbage" in veggies')

var veggies = { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5 }
var veggie = indexOf(veggies, 'cabbage')
console.log(veggie)


console.log('CASE find the index of first instance of "green" after index 2')
var colors = {
    0: 'red',
    1: 'green',
    2: 'blue',
    3: 'yellow',
    4: 'green',
    length: 5
}

var color = indexOf(colors, 'green', 2)
console.log(color)

console.log('CASE if instance of something is not found')

var color2 = indexOf(colors, 'grey')
console.log(color2)

console.log('CASE if the start index is negative')

var color3 = indexOf(colors, 'green', -3)
console.log(color3)