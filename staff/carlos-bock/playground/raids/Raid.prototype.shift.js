var Raid = function () {
    this.length = 0;
};

Raid.prototype.shift = function () {

    var result = this[0];

    for (let i = 0; i < this.length-1; i++) {
        this[i] = this[i+1];
    }

    this.length--;
    return result;
}

console.log("TEST Raid.prototype.shift");
console.log('CASE shift off first value in array');

var obj = new Raid;
obj[0] = true;
obj[1] = true;
obj[2] = true;
obj.length = 3;

var result = obj.shift();
console.log(result);