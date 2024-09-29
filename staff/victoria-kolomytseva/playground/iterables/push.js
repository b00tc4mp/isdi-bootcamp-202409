var push = function (iterable, element) {
    iterable[iterable.length] = element
    iterable.length++

    return iterable.length
}




console.log('Test push')

console.log('Case add 30 tu nums')

var nums = { 0: 9, 1: 10, 2: 15, 3: 22, 4: 1, length: 5 };

var length = push(nums, 30);

console.log(nums)
//{ 0: 9, 1: 10, 2: 15, 3: 22, 4: 1, 5: 30, length: 6 };

console.log(length)
//6



var push = function (iterable, element) {
    if (arguments.length === 3) {
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



console.log('CASE add nissan, volswagen to coches')

var coches = { 1: 'volvo', 2: 'mercedes', 3: 'toyota', 4: 'audi', 5: 'honda', length: 6 };
var length = push(coches, 'nissan', 'volswagen')

console.log(coches)
//{1: 'volvo', 2: 'mercedes', 3: 'toyota', 4: 'audi', 5: 'honda', 6: 'nissan, 7:'volkswagen' length: 8};

console.log(length)
    //8


    *
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

console.log('TEST push')

console.log('CASE add 400 to nums')

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var length = push(nums, 400)

console.log(nums)
// { 0: 100, 1: 200, 2: 300, 3: 400, length: 4 }
console.log(length)
// 4

console.log('CASE add banana to fruits')

var fruits = { 0: 'apple', 1: 'orange', 2: 'raspberry', 3: 'pineapple', length: 4 }
var length = push(fruits, 'banana')

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
    */