var Raid = function () {
    this.length = 0
}

Raid.prototype.findIndex = function (callback, value) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        //llamo al callback y almaceno el elemento devuelto
        var newValue = callback(element)

        if (newValue > value) {
            return [i]
        }
    }
}
console.log('TEST Raid.prototype.findIndex')

console.log('CASE multiply findIndex >10')

var nums = new Raid
nums[0] = 1
nums[1] = 4
nums[2] = 9
nums[3] = 16
nums.length = 4

var map1 = function (value) {
    return value
};

var res = nums.findIndex(map1, 10)
console.log(res)
//3