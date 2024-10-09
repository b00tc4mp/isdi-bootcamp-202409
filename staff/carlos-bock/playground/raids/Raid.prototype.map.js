var Raid = function () {this.length = 0};
Raid.prototype.map = function (callback) {
    for (var i = 0; i < this.length; i++) {
        this[i] = callback(this[i]);
    }
    return this;
}
//callback
function double(arg){arg = arg * 2; return arg};


var nums = new Raid;
nums[0] = 5;
nums[1] = 10;
nums[2] = 15;
nums[3] = 20;
nums.length = 4;

var mutated = nums.map(double);
console.log(mutated);
//expected output { '0': 10, '1': 20, '2': 30, '3': 40, length: 4 }

