var Raid = function () {
    this.length = 0
}

Raid.prototype.shift = function () {
    var first = this[0];
    this.length -= 1
    for (var i = 0; i < this.length; i++) {
        this[i] = this[i + 1];
    }
    delete this[this.length];
    return first;
}

console.log("TEST Raid.prototype.shift");

console.log("CASE extract red from colors");

var colors = new Raid
colors[0] = "red"
colors[1] = "green"
colors[2] = "blue"
colors[3] = "yellow"
colors.length = 4
var color = colors.shift()

console.log(colors)
// Raid { 0: "green", 2: "blue", 3: "yellow", length: 3 }
console.log(color)
// red

console.log("CASE extract 100 from nums");

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5
var num = nums.shift();

console.log(nums)
// Raid {0: 200, 1: 300, 2: 400, 3: 500, length: 4};
console.log(num)
// 100