console.log('TEST iterables/map')
// create a new object with the iterable modified by the callback function
var map = function (iterable, callback) {
  var result = { length: 0 }
  for (var i = 0; i < iterable.length; i++) {
    result[result.length] = callback(iterable[i])
    result.length++
  }
  return result
}

console.log('CASE multiply each number * 2')

numbers = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 }
mapped = map(numbers, function (num) {
  return num * 2
})

console.log(mapped)
// { 0: 2, 1: 8, 2: 18, 3: 32, length: 4 }