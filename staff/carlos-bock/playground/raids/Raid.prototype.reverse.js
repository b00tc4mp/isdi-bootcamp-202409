console.log("test Raid.prototype.reverse");

Raid.prototype.at = function (reverse) {
    this.length = 0;
}

Raid.prototype.reverse = function () {
    var newObj = {length:0};
    for (var i= this.length -1; i > -1; i--){
        newObj[newObj.length] = this[i];
        newObj.length++;
    }
    return newObj
};

var nums = new Raid
nums[0] = "one"
nums[1] = "two"
nums[2] = "three"
nums[3] = "four"
nums.length = 4

var reversed = nums.reverse();
console.log(reversed);