var Raid = function () {
    this.length = 0
}


Raid.prototype.unshift = function (element) {

    for (let i = this.length; i > 0; i--) {
        this[i] = this[i - 1]
    }
    this[0] = element;
    this.length++
    return this

}


console.log("TEST raid.prototype.unshift")

console.log("CASE")

var obj = new Raid
obj[0] = 1
obj[1] = 2
obj[2] = 3
obj.length = 3

console.log(obj.unshift(4));
// Expected output: obj1 {0:4, 1:1, 2:2, 3.4 length 4}

