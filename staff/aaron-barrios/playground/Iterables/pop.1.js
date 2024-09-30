var pop = function (iterable, element) {
    /*
    extract last element from iterable
    decrease length from iterable
    delete last element from iterable
    return extracted element
    */

    var last = iterable[iterable.length - 1]
    delete iterable[iterable.length - 1]
    iterable.length--
    return last
}

console.log('TEST pop')

console.log('CASE extract 300 from to nums')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var num = pop(nums)

console.log(nums)
//{ 0: 100, 1: 200, length: 2}

console.log(num)
//300

var fruits = { 0: 'pear', 1: 'apple', 2: 'banana', 3: 'strawberry', length: 4 }
var fruit = pop(fruits)

console.log(fruits)
//{ 0: 'pear', 1: 'apple', 2: 'banana', 3:'strawberry',length: 3}

console.log(length)
//higo