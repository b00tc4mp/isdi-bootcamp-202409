console.log('TEST iterables/forEach')
// recorremos el objeto iterable y en cada vuelta llamamos a una funcion y la ejecutamos

var forEach = function (iterable, callback) {
  for (var i = 0; i < iterable.length; i++) {
    callback(iterable[i], i)
  }
}

console.log('CASE show elements of obj in console')

var obj = { length: 0 }
obj[0] = 'a'
obj[1] = 'b'
obj[2] = 'c'
obj.length = 3

forEach(obj, function (element, index) {
  console.log(index + ':' + element)
})

console.log('CASE sum all elements of numbers')

var numbers = { length: 0 }
numbers[0] = 100
numbers[1] = 200
numbers[2] = 300
numbers.length = 3

var result = 0
forEach(numbers, function (num) {
  result += num
})
console.log(result)