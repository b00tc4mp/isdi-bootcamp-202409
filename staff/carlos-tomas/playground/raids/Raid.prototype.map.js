var Raid = function () {
    this.length = 0
}

Raid.prototype.map = function (callback) {
    var nums2 = new Raid
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        nums2[i] = callback(element)
        nums2.length++
    }
    return nums2
}

console.log("CASE map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos")

var nums = new Raid
nums[0] = 1
nums[1] = 4
nums[2] = 9
nums[3] = 16
nums[4] = 18
nums.length = 4

var res = nums.map(function (num) {
    return num * 2
})

console.log(res)
//nums2 {0: 2, 1: 8, 2: 18, 3: 32, length: 4}