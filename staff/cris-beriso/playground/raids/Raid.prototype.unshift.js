var Raid = function () {
    this.length = 0
}

Raid.prototype.unshift = function (element) {
    for (var i = arguments.length - 1; i >= 0; i--) {
        for (var j = this.length; j > 0; j--) {
            this[j] = this[j - 1];
        }
        this.length++;
        this[0] = arguments[i];
    }
    return this.length;
}

console.log("TEST Raid.prototype.unshift");

console.log("CASE add 400 at the beggining of nums");

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums.length = 3
var length = nums.unshift(400)

console.log(nums);
// Raid {0: 400, 1: 100, 2: 200, 3: 300, length: 4}
console.log(length);
// 4

console.log("CASE add banana at the beggining of fruits");

var fruits = new Raid
fruits[0] = "apple"
fruits[1] = "orange"
fruits[2] = "raspberry"
fruits[3] = "pineaple"
fruits.length = 4
var length = fruits.unshift("banana");

console.log(fruits);
// Raid {0: "banana", 1: "apple", 2: "orange", 3: "raspberry", 4: "pineaple", length: 5}
console.log(length);
// 5

console.log("CASE add banana pear and coconut to fruit");

var fruits = new Raid
fruits[0] = "apple"
fruits[1] = "orange"
fruits[2] = "raspberry"
fruits[3] = "pineaple"
fruits.length = 4
var length = fruits.unshift("banana", "pear", "coconut");

console.log(fruits);
// Raid {0: "banana", 1: "pear", 2: "coconut", 3: "apple", 4: "orange", 5: "raspberry", 6: "pineaple", length: 7}
console.log(length);
// 7