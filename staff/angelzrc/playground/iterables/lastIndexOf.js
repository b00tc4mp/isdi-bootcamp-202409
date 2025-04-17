var lastIndexOf = function (iterable, value, fromIndex) {
    if (!fromIndex) {
        fromIndex = iterable.length - 1

    } else if (fromIndex < 0) {
        fromIndex = iterable.length + fromIndex
    }


    for (let j = fromIndex; j > 0; j--) {
        if (iterable[j] === value) {
            return j
        }

    } return -1
}





console.log('CASE find the last instance of "cabbage" in veggies')

var veggies = { 0: 'broccoli', 1: 'cauliflower', 2: 'cabbage', 3: 'kale', 4: 'tomato', length: 5 }
var veggie = lastIndexOf(veggies, 'cabbage')
console.log(veggie)


console.log('CASE find the index of last instance of "green" before index 2')
var colors = {
    0: 'red',
    1: 'green',
    2: 'blue',
    3: 'yellow',
    4: 'green',
    length: 5
}

var color = lastIndexOf(colors, 'green', 2)
console.log(color)

console.log('CASE if instance of something is not found')

var color2 = lastIndexOf(colors, 'grey')
console.log(color2)