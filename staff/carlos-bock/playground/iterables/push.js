var push = function (iretable, element) {
    iretable[iretable.length] = element;
    iretable.length++;
}

console.log("test push");

console.log("case add 400 to nums");

var nums = {0:100, 1:200, 2:300, length:3};
var length = push(nums, 400);

console.log(length);

console.log("case add banana to fruits");

var fruits = {0:"apple", 1:"orange", 2:"rasberry", 3:"pineapple", length:4 };
var length = fruits.push("banana");

console.log(fruits);

console.log(length);