var shift = function (iterable) {
    var first = iterable[0];
    iterable.length -= 1
    for (var i = 0; i < iterable.length; i++) {
        iterable[i] = iterable[i + 1];
    }
    delete iterable[iterable.length];
    return first;
}

console.log("TEST shift");

console.log("CASE extract red from colors");

var colors = { 0: "red", 1: "green", 2: "blue", 3: "yellow", length: 4 }
var color = shift(colors);

console.log(colors)
// { 0: "green", 2: "blue", 3: "yellow", length: 3 }
console.log(color)
// red

console.log("CASE extract 100 from nums");

var nums = { 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5 };
var num = shift(nums);

console.log(nums)
// {0: 200, 1: 300, 2: 400, 3: 500, length: 4};
console.log(num)
// 100