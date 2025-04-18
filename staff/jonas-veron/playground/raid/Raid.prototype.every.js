console.log('TEST Raid.prototype.every.js')

var Raid = function(){
    this.length = 0
}

Raid.prototype.every = function(callback){
    for(var i = 0; i < this.length; i++){
        var element = this[i]
        if(callback(element))
            return true
    } return false
}

console.log('CASE 1')

var nums = new Raid
nums[0] = 1
nums[1] = 30
nums[2] = 39
nums[3] = 29
nums[4] = 10
nums[5] = 13
nums.length = 6

var condition = function(num){
    return num < 40
}

var condition2 = function(num){
    return num > 40
}

var result = nums.every(condition)
console.log(result)
//true

var result2 = nums.every(condition2)
console.log(result2)
//false