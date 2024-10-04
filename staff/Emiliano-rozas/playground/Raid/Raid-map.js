var Raid = function () {
    this.length = 0;
}

Raid.prototype.map = function (callback) {
    var result = { length: 0 }
    for (var i = 0; i < this.length; i++) {
        result[result.length] = callback(this[i])
        result.length++
    }
    return result
}

var operation = function (num) {
    return num * 2
}


var nums = new Raid
nums[0] = 10
nums[1] = 20
nums[2] = 30
nums[3] = 40
nums.length = 4


var res = nums.map(operation)
console.log(res)













var nums = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 };
