var Raid = function () {
    this.length = 0
}
Raid.prototype.reverse = function () {
    for (var i = 0; i < Math.floor(this.length / 2); i++) {
        var element = this[i]
        this[i] = this[this.length - 1 - i]
        this[this.length - 1 - i] = element
    }
    return this
}

console.log("TEST Raid.prototype.reverse");

console.log("CASE reverse the array")

var nums = new Raid
nums[0] = "one"
nums[1] = "two"
nums[2] = "three"
nums[3] = "four"
nums[4] = "five"
nums.length = 5

var reversed = nums.reverse()
console.log(reversed);
// {0: "five", 1: "four", 2: "three", 3: "two", 4: "one", length: 5}