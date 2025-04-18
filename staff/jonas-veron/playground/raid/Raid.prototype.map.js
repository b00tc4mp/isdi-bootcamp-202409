var Raid = function(){
    this.length = 0
}

Raid.prototype.map = function(callback){
var result = {length:0}
for(var i = 0; i < this.length; i++){
    var element = this[i]
    result[result.length] = callback(element, i, this)
    result.length++
    }
    return result
}

console.log('TEST Raid.prototype.map')

console.log('CASE pass a function to map')

var nums = new Raid
nums[0] = 1
nums[1] = 4
nums[2] = 9
nums[3] = 16
nums.length = 4

var res = nums.map(function(number){ 
    return number*2
})

console.log(res)