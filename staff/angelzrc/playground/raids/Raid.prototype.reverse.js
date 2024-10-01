var Raid = function () {
    this.length = arguments.length
    for (var i = 0; i< arguments.length; i++) {
        this[i] = arguments[i]
    }
}

console.log('TEST Raid.prototype.reverse')
Raid.prototype.reverse= function (){
    reversed = new Raid
    reversed.length= this.length
    for (var i = 0; i < this.length; i++){
        reversed[i] = this[this.length-1-i]
    }

    for(var j = 0; j < this.length; j++) {
        this[j] = reversed[j]
    }
    return this
}

var nums = new Raid(100, 200, 300);
console.log(nums);
// Raid {0: 100, 1: 200, 2: 300, length: 3}


console.log('Revertir los elementos en nums')
var reversed = nums.reverse();
console.log(nums);
// Raid {0: 300, 1: 200, 2: 100, length: 3}