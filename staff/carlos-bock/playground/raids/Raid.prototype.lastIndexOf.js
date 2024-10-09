var Raid = function () {
    this.length =0;
}

Raid.prototype.lastIndexOf = function (element) {
    for (let i = this.length-1; i > 0; i--) {
        if (this[i] === element) {
            return i;
        }       
    }
    return -1;
}

console.log("TEST Raid.prototype.lastIndexOf");

console.log("CASE get number at index 3 in nums");

var obj = new Raid;
obj[0] = 1;
obj[1] = 2;
obj[2] = 3;
obj[3] = 4;
obj[4] = 5;
obj[5] = 6;
obj[6] = 4;
obj[7] = 7;
obj.length = 8;

var result = obj.lastIndexOf(4);
console.log(result);
//expect 6
