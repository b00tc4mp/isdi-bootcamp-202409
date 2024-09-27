console.log('TEST iterables/reverse')
// change the order of the iterable in reverse
// return the reversed array
var reverse = function (iterable) {
  var newArray = { length: 0 };

  for (var i = iterable.length - 1; i >= 0; i--) {
    newArray[newArray.length] = iterable[i]
    newArray.length++
  }
  return newArray
}

console.log('CASE reverse array numbers')
var numbers = { 0: 'one', 1: 'two', 2: 'three', length: 3 }
var reversed = reverse(numbers)
console.log(reversed) // Expected output ["three", "two", "one"]

console.log('CASE reverse letters')
var letters = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var reversed2 = reverse(letters)
console.log(reversed2) // Expected output ['c', 'b', 'a']