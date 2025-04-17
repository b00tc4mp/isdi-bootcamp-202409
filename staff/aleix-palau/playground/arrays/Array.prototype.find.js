console.log('TEST Array.prototype.find')

console.log('CASE return the array\'s first number greater than 10')

var array1 = [5, 12, 8, 130, 44]

var found = array1.find(function (element) {
    return element > 10
})

console.log(found)
// 12