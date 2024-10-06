var Raid = function () {
    this.length = 0;
};

Raid.prototype.unShift = function (newvalue) {
    for (var i = this.length; i > -1; i--) {
        this[i] = this[i-1];
        if (i === 0) this[0] = newvalue;
        
    }
    this.length++;
};


console.log("TEST Raid.prototype.unshift");

console.log("CASE add value at begining of iterable");



var obj = new Raid;
obj[0] = false;
obj[1] = false;
obj[2] = true;
obj[3] = false;
obj.length = 4;

var result = obj.unShift(3);
console.log(result);
