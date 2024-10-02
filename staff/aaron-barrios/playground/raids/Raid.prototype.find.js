var Raid = function () {
    this.length = 0
}

Raid.prototype.find = function (callback, value) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        //llamo al callback y almaceno el elemento devuelto
        var newValue = callback(element)

        if (newValue > value) {
            return element
        }
    }
}
console.log('TEST Raid.prototype.find')

console.log('CASE multiply *2 nums array')

var nums = new Raid
nums[0] = 1
nums[1] = 4
nums[2] = 9
nums[3] = 16
nums.length = 4

var map1 = function (value) {
    return value
};

var res = nums.find(map1, 10)
console.log(res)
//16