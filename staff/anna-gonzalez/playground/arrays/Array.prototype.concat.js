console.log('TEST Array.prototype.concat')

console.log('CASE concat two arrays')

var array1 = [1, 2, 3]
var array2 = ['a', 'b', 'c']
var newArray = array1.concat(array2)

console.log(newArray)
// [1, 2, 3, 'a', 'b', 'c']

console.log('CASE concat three arrays')

var array1 = [1, 2, 3]
var array2 = ['a', 'b', 'c']
var array3 = ['fish', 'almond', 'nut']
var newArray = array1.concat(array2, array3)

console.log(newArray)
// [1, 2, 3, 'a', 'b', 'c', 'fish', 'almond', 'nut']

console.log('CASE concat values to an array')

var array1 = ['a', 'b', 'c']
var newArray = array1.concat(1, 2)

console.log(newArray)
// ['a', 'b', 'c', 1, 2]