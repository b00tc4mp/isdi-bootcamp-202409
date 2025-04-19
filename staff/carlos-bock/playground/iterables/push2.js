var push = function (iterable, element) {
    if (arguments.length === 2) {
        iterable[iterable.length] = element;
        iterable.length++;
    } else {
        for (var i = 1; i < arguments.length; i++) {
            iterable[iterable.length] = element;
            iterable.length++;
        }
    }
    return iterable.length;
}



console.log(fruits)
// { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', 4: 'banana', length: 5 }

console.log(length)
// 5

console.log('CASE add banana pear and coconut to fruits')
var fruits = { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', length: 4 }
var length = push(fruits, 'banana', 'pear', 'coconut')
console.log(fruits)
// ['apple', 'orange', 'raspberry', 'pineapple', 'banana', 'pear', 'coconut'] (7)
console.log(length)
// 7