var includes = function (iterable, searchElement) {
    for (var i = 0; i < iterable.length; i++) {
        if (iterable[i] === searchElement) return true
    }
    return false
}

console.log("TEST includes");

console.log("CASE find number 2 in number");

var numbers = { 0: 1, 1: 2, 2: 3, length: 3 };
var result = includes(numbers, 2);
console.log(result);
// True

console.log("CASE find cat in pets")

var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 };
var result = includes(pets, 'cat');
console.log(result);
// True

console.log('CASE find cow in pets');
var pets = { 0: 'cat', 1: 'dog', 2: 'bat', length: 3 };
var result = includes(pets, 'cow');
console.log(result);
// False