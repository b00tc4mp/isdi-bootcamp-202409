console.log('TEST iterables/forEach')
// usamos recursividad para hacer el forEach

var forEach = function (iterable, callback, index) {
  if (index === undefined) index = 0

  callback(index, iterable)

  if (index < iterable.length - 1)
    forEach(iterable, callback, index + 1)
}



console.log('CASE show elements of obj in console')

var obj = { length: 0 }
obj[0] = 'a'
obj[1] = 'b'
obj[2] = 'c'
obj.length = 3

forEach(obj, function (i, a) { console.log(a[i]) })

console.log('CASE sum all elements of numbers')

var numbers = { length: 0 }
numbers[0] = 100
numbers[1] = 200
numbers[2] = 300
numbers.length = 3

var result = 0
forEach(numbers, function (i, a) { result += a[i] })
console.log(result)