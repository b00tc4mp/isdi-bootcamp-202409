var unshift = function (iterable, element) {
    for (var i = arguments.length - 1; i > 0; i--) {
        for (var j = iterable.length; j > 0; j--) {
            iterable[j] = iterable[j - 1];
        }
        iterable["length"]++;
        iterable[0] = arguments[i];
    }
    return iterable.length;
}

console.log("TEST unshift");

console.log("CASE add 400 at the beggining of nums");

var nums = { 0: 100, 1: 200, 2: 300, length: 3 }
var length = unshift(nums, 400)

console.log(nums);
// {0: 400, 1: 100, 2: 200, 3: 300, length: 4}
console.log(length);
// 4

console.log("CASE add banana at the beggining of fruits");

var fruits = { 0: "apple", 1: "orange", 2: "raspberry", 3: "pineaple", length: 4 };
var length = unshift(fruits, "banana");

console.log(fruits);
// {0: "banana", 1: "apple", 2: "orange", 3: "raspberry", 4: "pineaple", length: 5}
console.log(length);
// 5

console.log("CASE add banana pear and coconut to fruits");

var fruits = { 0: "apple", 1: "orange", 2: "raspberry", 3: "pineaple", length: 4 };
var length = unshift(fruits, "banana", "pear", "coconut");

console.log(fruits);
// {0: "banana", 1: "pear", 2: "coconut", 3: "apple", 4: "orange", 5: "raspberry", 6: "pineaple", length: 7}
console.log(length);
// 7