var push = function (iterable, element) {
    if (arguments.length === 2) {
        iterable[iterable.length] = element
        iterable.length++
    } else {
        for (var i = 1; i < arguments.length; i++) {
            var element = arguments[i]

            iterable[iterable.length] = element
            iterable.length++
        }
    }

    return iterable.length
}

console.log("TEST push")

console.log('CASE add banana to fruits')

var fruits = ['apple', 'orange', 'raspberry', 'pineapple']
var length = fruits.push('banana')

console.log(fruits)
// ['apple', 'orange', 'raspberry', 'pineapple', 'banana'] (5)
console.log(length)
// 5