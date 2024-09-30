var Raid = function () {
    this.length = 0
}

Raid.prototype.at = function () {

}





console.log('TEST Raid.prototype.at')

console.log('CASE get number at index 3 in nums')

var nums = new Raid
nums[0] = 100
nums[1] = 200
nums[2] = 300
nums[3] = 400
nums[4] = 500
nums.length = 5

{ 0: 100, 1: 200, 2: 300, 3: 400, 4: 500, length: 5 }

var num = nums.at(3)
console.log(num)
// 400