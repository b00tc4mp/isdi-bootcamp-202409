var shift = function (iterable) {
    var firstElement = iterable[0]
    delete iterable[0]
    for (var i = 1; i < iterable.length; i++) {
        iterable[i - 1] = iterable[i]
    }
    iterable.length--
    delete iterable[iterable.length] //borrar la posición que nos sobra por la cola del iterable
    return firstElement
}

console.log('CASE remove 1 from numbers')

var numbers = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }
var removedNumber = shift(numbers)

console.log(numbers)
// {0: 2, 1: 3, 2: 4, 3: 5, length: 4}
console.log(removedNumber)
// 1

console.log('CASE remove barcelona from cities')

var cities = { 0: 'barcelona', 1: 'madrid', 2: 'bilbao', length: 3 }
var removedCity = shift(cities)

console.log(cities)
// {0: 'madrid', 1: 'bilbao', length: 2}
console.log(removedCity)
// barcelona