// var unshift = function(iterable, element){      //ACEPTA SOLO 1 ELEMENTO
//     for(var i = iterable.length; i >= 0; i--){
//         iterable[i] = iterable[i - 1]
//     }
//     iterable[0] = element
//     iterable.length++
//     return iterable
// }

var unshift = function (iterable, ...theElements) { // numbers, 100, 200, 300
    for (var i = theElements.length - 1; i >= 0; i--) {
        for (var j = iterable.length; j >= 0; j--) {
            iterable[j] = iterable[j - 1]
        }
        iterable[0] = theElements[i]
        iterable.length++
    }
    return iterable
}

console.log('CASE add [10, 20] to numbers')

var numbers = { 0: 1, 1: 2, 2: 3, length: 3 }

console.log(numbers)
// {0: 1, 1: 2, 2: 3, length: 3}
console.log(unshift(numbers, [20, 30]))
// {0: [20, 30], 1: 1, 2: 2, 3: 3, length: 4}

console.log('CASE add barcelona, madrid to cities')

var cities = { 0: 'malaga', 1: 'zaragoza', 2: 'valencia', length: 3 }

console.log(cities)
// (3) {0: 'malaga', 1: 'zaragoza', 2: 'valencia', length: 3}
console.log(unshift(cities, 'barcelona', 'madrid'))
// (5) {0: 'barcelona', 1: 'madrid', 2: 'malaga', 3: 'zaragoza', 4: 'valencia', length: 5}